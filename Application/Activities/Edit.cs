using System;
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
    public class Edit
    {
//        public class ActivityData
//        {
//            public string Title { get; set; }
//            public string Description { get; set; }
//            public string Category { get; set; }
//            public DateTime? Date { get; set; }
//            public string City { get; set; }
//            public string Venue { get; set; }
//        }

        public class Command : IRequest<ActivityDto>
        {
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, ActivityDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ActivityDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .Include(x => x.Attendees)
                    .ThenInclude(x => x.AppUser)
                    .ThenInclude(p => p.Photos)
                    .Include(c => c.Comments)
                    .ThenInclude(x => x.Author)
                    .ThenInclude(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
                
                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Activity = "Not Found"});

                activity.Title = request.Title ?? activity.Title;
                activity.Description = request.Description ?? activity.Description;
                activity.Category = request.Category ?? activity.Category;
                activity.Date = request.Date ?? activity.Date;
                activity.City = request.City ?? activity.City;
                activity.Venue = request.Venue ?? activity.Venue;

                await _context.SaveChangesAsync(cancellationToken);

                return _mapper.Map<Activity, ActivityDto>(activity);
            }
        }
    }
}