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

        [HttpGet("{username}/{followType}")]
        public async Task<IActionResult> Following(string username, string followType)
        {
            var users = await Mediator.Send(new List.Query{Username = username, FollowType = followType});

            return Ok(users);
        }
        
//        [HttpGet("{username}/followers")]
//        public async Task<IActionResult> Followers(string username)
//        {
//            return Ok();
//        }
    }
}