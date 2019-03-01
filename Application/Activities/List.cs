using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class ActivitiesEnvelope
        {
            public List<ActivityDto> Activities { get; set; }
            public int ActivityCount { get; set; }
        }

        public class Query : IRequest<ActivitiesEnvelope>
        {
            public Query(string sort, string username, string host, bool going, DateTime? startDate, int? limit, int? offset)
            {
                Sort = sort;
                Username = username;
                Host = host;
                Going = going;
                StartDate = startDate;
                Limit = limit;
                Offset = offset;
            }

            public string Sort { get; set; }
            public string Username { get; set; }
            public string Host { get; set; }
            public bool Going { get; set; }
            public DateTime? StartDate { get; set; }
            public int? Limit { get; }
            public int? Offset { get; }
        }

        public class Handler : IRequestHandler<Query, ActivitiesEnvelope>
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

            public async Task<ActivitiesEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.Activities.GetAllData();
                
                if (!string.IsNullOrEmpty(request.Username))
                {
                    queryable = queryable
                        .Where(a => a.Attendees.Any(x => x.AppUser.UserName == request.Username));
                }
                
                if (!string.IsNullOrEmpty(request.Host))
                {
                    queryable = queryable
                        .Where(a => a.Attendees.Any(x => x.IsHost && x.AppUser.UserName == request.Host));
                }

                if (request.Going)
                {   
                    queryable = queryable
                        .Where(a => a.Attendees.Any(x => x.AppUser.UserName == _userAccessor.GetCurrentUsername()));
                }

                if (request.StartDate != null)
                {
                    queryable = queryable
                        .Where(d => d.Date >= request.StartDate);
                }

                switch (request.Sort)
                {
                    case "past":
                        queryable = queryable
                            .Where(x => x.Date < DateTime.Now)
                            .OrderByDescending(x => x.Date);
                        break;
                    default:
                        queryable = queryable
                            .Where(x => x.Date > DateTime.Now)
                            .OrderBy(x => x.Date);
                        break;
                }

                var activities = await queryable
                    .Skip(request.Offset ?? 0)
                    .Take(request.Limit ?? 3)
                    .ToListAsync(cancellationToken);

                var activitiesToReturn = _mapper.Map<List<Activity>, List<ActivityDto>>(activities);

                foreach (var activity in activitiesToReturn)
                {
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
                }

                return new ActivitiesEnvelope
                {
                    Activities = activitiesToReturn,
                    ActivityCount = queryable.Count()
                };
            }
        }
    }
}