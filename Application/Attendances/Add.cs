using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Attendances
{
    public class Add
    {
        public class Command : IRequest<ActivityDto>
        {
            public Command(int id)
            {
                Id = id;
            }
            
            public int Id { get; set; }
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
                var activity = await _context.Activities
                    .Include(x => x.Attendees)
                    .ThenInclude(x => x.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                var user = await _context.Users.FirstOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetCurrentUsername(), cancellationToken);
                
                // check to see if attendance exists
                var attendance =
                    await _context.Attendees.FirstOrDefaultAsync(
                        x => x.ActivityId == activity.Id && x.AppUserId == user.Id, cancellationToken);

                if (attendance == null)
                {
                    attendance = new ActivitiyAttendee
                    {
                        Activity = activity,
                        ActivityId = activity.Id,
                        AppUser = user,
                        AppUserId = user.Id,
                        DateJoined = DateTime.Now,
                        IsHost = false
                    };

                    await _context.Attendees.AddAsync(attendance, cancellationToken);
                    await _context.SaveChangesAsync(cancellationToken);
                }

                var activityToReturn = _mapper.Map<Activity, ActivityDto>(activity);

                return activityToReturn;
            }
        }
    }
}