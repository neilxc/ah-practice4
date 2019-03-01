using System;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users
{
    public class Refresh
    {
//        public class TokenData
//        {
//            public string Token { get; set; }
//            public string RefreshToken { get; set; }
//        }

        public class Command : IRequest<User>
        {
            public string Token { get; set; }
            public string RefreshToken { get; set; }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly DataContext _context;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(DataContext context, IJwtGenerator jwtGenerator)
            {
                _context = context;
                _jwtGenerator = jwtGenerator;
            }
            
            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                var principal = _jwtGenerator.GetPrincipalFromExpiredToken(request.Token);

                var username = principal.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;    

                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username, cancellationToken);
                if (user == null || user.RefreshToken != request.RefreshToken) 
                    throw new RestException(HttpStatusCode.BadRequest, new {Token = "The token is not valid..."});

                var newJwtToken = _jwtGenerator.CreateToken(user);
                var newRefreshToken = _jwtGenerator.GenerateRefreshToken();

                user.RefreshToken = newRefreshToken;
                user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);

                await _context.SaveChangesAsync(cancellationToken);

                return new User
                {
                    DisplayName = user.DisplayName,
                    Token = newJwtToken,
                    Username = user.UserName,
                    RefreshToken = newRefreshToken,
                    RefreshTokenExpiry = user.RefreshTokenExpiry
                };
            }
        }
    }
}