using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
//        public class ActivityData
//        {
//            public string Title { get; set; }
//            public string Description { get; set; }
//            public string Category { get; set; }
//            public DateTime Date { get; set; }
//            public string City { get; set; }
//            public string Venue { get; set; }
//        }

        public class Command : IRequest<ActivityDto>
        {
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty().NotNull();
                RuleFor(x => x.Description).NotEmpty().NotNull();
                RuleFor(x => x.Category).NotEmpty().NotNull();
                RuleFor(x => x.Date).NotEmpty().NotNull();
                RuleFor(x => x.City).NotEmpty().NotNull();
                RuleFor(x => x.Venue).NotEmpty().NotNull();
            }
        }

        public class Handler : IRequestHandler<Command, ActivityDto>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _context = context;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }
            
            public async Task<ActivityDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = new Activity
                {
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue
                };
                
                await _context.Activities.AddAsync(activity, cancellationToken);

                var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername(), cancellationToken);

                var attendee = new ActivitiyAttendee
                {
                    AppUser = user,
                    Activity = activity,
                    DateJoined = DateTime.Now,
                    IsHost = true,
                    ActivityId = activity.Id,
                    AppUserId = user.Id
                };

                await _context.Attendees.AddAsync(attendee, cancellationToken);

                await _context.SaveChangesAsync(cancellationToken);

                var activityToReturn = _mapper.Map<Activity, ActivityDto>(activity);

                return activityToReturn;
            }
        }
    }
}