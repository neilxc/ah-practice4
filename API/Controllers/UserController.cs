using System.Threading.Tasks;
using Application.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController : BaseController
    {
        [HttpGet]
        public async Task<User> GetCurrentUser()
        {
            return await Mediator.Send(new Details.Query());
        }

        [AllowAnonymous]
        [HttpGet("checkEmail")]
        public async Task<bool> CheckEmailExists([FromQuery]CheckEmail.Query query)
        {
            return await Mediator.Send(query);
        }

        [HttpPut]
        public async Task<User> UpdateUser(Edit.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}