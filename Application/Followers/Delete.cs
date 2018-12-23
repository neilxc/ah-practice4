using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Profiles;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Username { get; set; }
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
                var target =
                    await _context.Users.FirstOrDefaultAsync(x => x.UserName == request.Username,
                        cancellationToken);
    
                if (target == null)
                    throw new RestException(HttpStatusCode.NotFound, new {User = "Not found"});

                var observer =
                    await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername(),
                        cancellationToken);

                var followedPeople =
                    await _context.FollowedPeople.FirstOrDefaultAsync(
                        x => x.ObserverId == observer.Id && x.TargetId == target.Id, cancellationToken);

                if (followedPeople != null)
                {
                    _context.FollowedPeople.Remove(followedPeople);
                    await _context.SaveChangesAsync(cancellationToken);
                }

                return Unit.Value;
            }
        }
    }
}