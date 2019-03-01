using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
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
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<ActivityDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var activityFromDb = await _context.Activities
                    .GetAllData()
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
                
                if (activityFromDb == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Activity = "Not Found"});

//                activity.Comments.OrderByDescending(x => x.CreatedAt);
            
                var activity = _mapper.Map<Activity, ActivityDto>(activityFromDb);
                
                var currentUser = await _context.Users
                    .Include(x => x.Following)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername(), cancellationToken);
                
                foreach (var attendee in activity.Attendees)
                {
                    if (currentUser.Following.Any(x => x.TargetId == attendee.Id))
                    {
                        attendee.Following = true;
                    }
                }

                return activity;
            }
        }
    }
}