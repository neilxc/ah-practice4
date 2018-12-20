using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Users
{
    public class Login
    {
        public class UserData
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class Command : IRequest<User>
        {
            public UserData User { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.User.Email).NotNull().NotEmpty().EmailAddress();
                RuleFor(x => x.User.Password).NotNull().NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly IJwtGenerator _jwtGenerator;
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;

            public Handler(IJwtGenerator jwtGenerator, UserManager<AppUser> userManager, 
                SignInManager<AppUser> signInManager)
            {
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
                _signInManager = signInManager;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.User.Email);
            
                if (user == null)
                    throw new RestException(HttpStatusCode.Unauthorized, 
                        new {Email = "Email address not found"});

                var result = await _signInManager.CheckPasswordSignInAsync(user, request.User.Password, false);

                if (result.Succeeded)
                {
                    return new User
                    {
                        Bio = user.Bio,
                        Email = user.Email,
                        Image = null,
                        Token = _jwtGenerator.CreateToken(user),
                        Username = user.UserName
                    };
                }
            
                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}