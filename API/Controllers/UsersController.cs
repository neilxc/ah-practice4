using System.Threading.Tasks;
using Application.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class UsersController : BaseController
    {
        [HttpPost]
        public async Task<IActionResult> Create(Create.Command command)
        {
            var user = await Mediator.Send(command);

            return Ok(user);
        }
        
        [HttpPost("login")]
        public async Task<IActionResult> Login(Login.Command command)
        {
            var user = await Mediator.Send(command);
            return Ok(user);
        }
    }
}