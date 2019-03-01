using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Users;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class UsersController : BaseController
    {
        [HttpPost]
        public async Task<IActionResult> Create(Create.Command command)
        {
            // if successful, send email, return Ok..
            command.Url = String.Concat(HttpContext.Request.GetDisplayUrl(), "/verifyEmail");
            var user = await Mediator.Send(command);
            return Ok(user);
        }
        
        [HttpPost("login")]
        public async Task<IActionResult> Login(Login.Command command)
        {
            var user = await Mediator.Send(command);
            return Ok(user);
        }

        [HttpPost("externalLogin")]
        public async Task<IActionResult> ExternalLogin(ExternalLogin.Command command)
        {
            var user = await Mediator.Send(command);
            return Ok(user);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(Refresh.Command command)
        {
            var user = await Mediator.Send(command);
            return Ok(user);
        }
        
        [HttpGet("verifyEmail")]
        public async Task<IActionResult> VerifyEmail(string userId, string code)
        {
            var result = await Mediator.Send(new VerifyEmail.Command(userId, code));
            return Ok(result);
        }

        [HttpPost("forgotPassword")]
        public async Task<Unit> ForgotPassword(ForgotPassword.Command command)
        {
//            command.Url = String.Concat(HttpContext.Request.GetDisplayUrl(), "/forgotPassword");
            return await Mediator.Send(command);
        }

        [HttpPost("resetPassword")]
        public async Task<Unit> ResetPassword(ResetPassword.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("changePassword")]
        public async Task<Unit> ChangePassword(ChangePassword.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}