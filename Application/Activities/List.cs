using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
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
            public List<Activity> Activities { get; set; }
            public int ActivityCount { get; set; }
        }

        public class Query : IRequest<ActivitiesEnvelope>
        {
        }

        public class Handler : IRequestHandler<Query, ActivitiesEnvelope>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ActivitiesEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.Activities.Include(x => x.GeoCoordinate);

                var activities = await queryable.ToListAsync(cancellationToken);

                return new ActivitiesEnvelope
                {
                    Activities = activities,
                    ActivityCount = queryable.Count()
                };
            }
        }
    }
}