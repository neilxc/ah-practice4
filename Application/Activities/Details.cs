using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<ActivityDto>
        {
            public int Id { get; set; }
        }    

        public class Handler : IRequestHandler<Query, ActivityDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ActivityDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .GetAllData()
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
                
                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Activity = "Not Found"});

                return _mapper.Map<Activity, ActivityDto>(activity);
            }
        }
    }
}