using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Users
{
    public class Login
    {
        public class Command : IRequest<User>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Email).NotNull().NotEmpty().EmailAddress();
                RuleFor(x => x.Password).NotNull().NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly IJwtGenerator _jwtGenerator;
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            private readonly IMapper _mapper;

            public Handler(IJwtGenerator jwtGenerator, 
                UserManager<AppUser> userManager, 
                SignInManager<AppUser> signInManager,
                IMapper mapper)
            {
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
                _signInManager = signInManager;
                _mapper = mapper;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
            
                if (user == null)
                    throw new RestException(HttpStatusCode.Unauthorized, 
                        new {Email = "Email address not found"});

                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

                if (result.Succeeded)
                {
                    // generate a new refresh token for the user
                    var newRefreshToken = _jwtGenerator.GenerateRefreshToken();
                    user.RefreshToken = newRefreshToken;
                    user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
                    
                    await _userManager.UpdateAsync(user);
                    
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Token = _jwtGenerator.CreateToken(user),
                        Username = user.UserName,
                        RefreshToken = user.RefreshToken,
                        RefreshTokenExpiry = user.RefreshTokenExpiry
                    };
                }
            
                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}