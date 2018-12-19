using System.Threading.Tasks;
using Application.Activities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var activities = await _mediator.Send(new List.Query());

            return Ok(activities);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int id)
        {
            var activity = await _mediator.Send(new Details.Query {Id = id});

            return Ok(activity);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Create.Command command)
        {
            var response = await _mediator.Send(command);

            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, Edit.Command command)
        {
            command.Id = id;
            var activity = await _mediator.Send(command);

            return Ok(activity);
        }
    }
}