using System.Threading.Tasks;
using Application.Attendances;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/activities")]
    public class AttendanceController : BaseController
    {
        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Add(int id, Add.Command command)
        {
            command.Id = id;
            return Ok(await Mediator.Send(command));
        }

        [HttpDelete("{id}/attend")]
        public async Task<IActionResult> Delete(int id, Delete.Command command)
        {
            command.Id = id;
            return Ok(await Mediator.Send(command));
        }
    }
}