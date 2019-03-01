using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Remotion.Linq.Clauses;
using Profile = Application.Profiles.Profile;

namespace Application.Followers
{
    public class List
    {
        public class FollowersEnvelope
        {
            public List<Profile> FollowedPeople { get; set; }
            public int Count { get; set; }
        }
        public class Query : IRequest<List<FollowDto>>
        {
            public string Username { get; set; }
            public string FollowType { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<FollowDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            
            public async Task<List<FollowDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.FollowedPeople
                    .Include(x => x.Observer)
                    .Include(x => x.Target)
                    .AsNoTracking();  
                
                List<FollowDto> users;

                if (request.FollowType == "followers")
                {
                    users = await queryable
                        .Where(u => u.Target.UserName == request.Username)
                        .Select(x => new FollowDto
                        {
                            DisplayName = x.Observer.DisplayName,
                            Image = x.Observer.Photos.FirstOrDefault(y => y.IsMain).Url,
                            Username = x.Observer.UserName
                        }).ToListAsync(cancellationToken);
                }
                else
                {
                    users = await queryable
                        .Where(u => u.Observer.UserName == request.Username)
                        .Select(x => new FollowDto()
                        {
                            DisplayName = x.Target.DisplayName,
                            Image = x.Target.Photos.FirstOrDefault(y => y.IsMain).Url,
                            Username = x.Target.UserName
                        }).ToListAsync(cancellationToken);
                }

                return users;
            }
        }
    }
}