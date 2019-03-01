using System.Net;
using System.Text.Encodings.Web;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Users
{
    public class VerifyEmail
    {
        public class Command : IRequest
        {
            public Command(string userId, string code)
            {
                UserId = userId;
                Code = code;
            }
            
            public string UserId { get; set; }
            public string Code { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly UserManager<AppUser> _userManager;

            public Handler(UserManager<AppUser> userManager)
            {
                _userManager = userManager;
            }
            
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByIdAsync(request.UserId);
                if (user == null)
                    throw new RestException(HttpStatusCode.BadRequest);

                var result = await _userManager.ConfirmEmailAsync(user, request.Code);
                if (!result.Succeeded)
                    throw new RestException(HttpStatusCode.BadRequest, new {User = "Bad code please try again"});
                
                return Unit.Value;
            }
        }
    }
}