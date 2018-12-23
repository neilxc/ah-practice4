using System.Threading.Tasks;
using Application.Followers;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/profiles")]
    public class FollowersController : BaseController
    {
        [HttpPost("{username}/follow")]
        public async Task<Profile> Follow(string username)
        {
            return await Mediator.Send(new Add.Command{Username = username});
        }

        [HttpDelete("{username}/follow")]
        public async Task<IActionResult> Unfollow(string username)
        {
            return Ok(await Mediator.Send(new Delete.Command{Username = username}));
        }
    }
}