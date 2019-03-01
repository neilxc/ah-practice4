using System.Collections.Generic;
using System.Text.Encodings.Web;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.WebUtilities;

namespace Application.Users
{
    public class ForgotPassword
    {
        public class Command : IRequest
        {
            public string Email { get; set; }
            public string ReturnUrl { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IEmailSender _emailSender;

            public Handler(UserManager<AppUser> userManager, IEmailSender emailSender)
            {
                _userManager = userManager;
                _emailSender = emailSender;
            }
            
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return Unit.Value;
                }

                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                
                var queryParams = new Dictionary<string, string>
                {
                    {"userId", user.Id.ToString()},
                    {"code", code}
                };
                
                var callbackUrl = QueryHelpers.AddQueryString(request.ReturnUrl, queryParams);

                await _emailSender.SendEmailAsync(
                    request.Email,
                    "Reset Password",
                    $"Please reset your password by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

                return Unit.Value;
            }
        }
    }
}