using System.Threading.Tasks;
using Application.Attendances;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/activities")]
    public class AttendanceController : BaseController
    {
        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Add(int id)
        {
            return Ok(await Mediator.Send(new Add.Command(id)));
        }

        [HttpDelete("{id}/attend")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}