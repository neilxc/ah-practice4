using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Encodings.Web;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users
{
    public class Create
    {
        public class Command : IRequest<AppUser>
        {
            public string DisplayName { get; set; }
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string Url { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotNull().NotEmpty();
                RuleFor(x => x.Username).NotNull().NotEmpty();
                RuleFor(x => x.Email).NotNull().NotEmpty();
                RuleFor(x => x.Password).NotNull().NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, AppUser>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IEmailSender _emailSender;

            public Handler(
                DataContext context, 
                UserManager<AppUser> userManager, 
                IJwtGenerator jwtGenerator,
                IEmailSender emailSender)
            {
                _context = context;
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
                _emailSender = emailSender;
            }

            public async Task<AppUser> Handle(Command request, CancellationToken cancellationToken)
            {
                // check to see if email is in use
                if (await _context.Users.Where(x => x.Email == request.Email).AnyAsync(cancellationToken)) 
                    throw new RestException(HttpStatusCode.BadRequest, new {Email = "In Use"});
                
                if (await _context.Users.Where(x => x.UserName == request.Username).AnyAsync(cancellationToken)) 
                    throw new RestException(HttpStatusCode.BadRequest, new {Username = "In Use"});

                var user = new AppUser
                {
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.Username,
                    RefreshToken = _jwtGenerator.GenerateRefreshToken(),
                    RefreshTokenExpiry = DateTime.UtcNow.AddDays(7)
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);

//                    var confirmResult = await _userManager.ConfirmEmailAsync(user, code);

                    var queryParams = new Dictionary<string, string>
                    {
                        {"userId", user.Id.ToString()},
                        {"code", code}
                    };

                    var callbackUrl = QueryHelpers.AddQueryString(request.Url, queryParams);

                    var encodedUrl = HtmlEncoder.Default.Encode(callbackUrl);

                    await _emailSender.SendEmailAsync(user.Email, "Verify your email address",
                        $"Click <a href=\"{encodedUrl}\">here</a> to verify your email address");
                   
                    return user;

//                    return new User
//                    {
//                        Username = user.UserName,
//                        DisplayName = user.DisplayName,
//                        Token = _jwtGenerator.CreateToken(user),
//                        RefreshToken = user.RefreshToken,
//                        RefreshTokenExpiry = user.RefreshTokenExpiry
//                    };
                }

                throw new Exception("Something went wrong");
            }
        }
    }
}