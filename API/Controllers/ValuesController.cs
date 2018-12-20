using System.Threading.Tasks;
using Application.Values;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ValuesController : BaseController
    {
        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var values = await Mediator.Send(new List.Query());
            
            return Ok(values);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var value = await Mediator.Send(new Details.Query{Id = id});
            
            return Ok(value);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
