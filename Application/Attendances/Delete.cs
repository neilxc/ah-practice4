using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Attendances
{
    public class Delete
    {
        public class Data
        {

        }

        public class Command : IRequest
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = _context.Activities.GetAllData()
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
                
                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Activity = "Not Found"});

                var user = _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername(),
                    cancellationToken);

                var attendance =
                    await _context.Attendees.FirstOrDefaultAsync(
                        x => x.ActivityId == activity.Id && x.AppUserId == user.Id, cancellationToken);

                if (attendance != null)
                {
                    _context.Attendees.Remove(attendance);
                    await _context.SaveChangesAsync(cancellationToken);
                }

                return Unit.Value;
            }
        }
    }
}