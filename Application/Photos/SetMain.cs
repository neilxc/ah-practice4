using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest
        {
            public Command(int id)
            {
                Id = id;
            }

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
                // get current username
                var currentUsername = _userAccessor.GetCurrentUsername();
                // get user
                var user = await _context.Users
                    .Include(p => p.Photos)
                    .FirstOrDefaultAsync(u => u.UserName == currentUsername, cancellationToken);
                // compare photo id to ensure that it matches one of the users photos
                if (user.Photos.All(p => p.Id != request.Id))
                    throw new RestException(HttpStatusCode.Forbidden, new {Photo = "This is not your photo"});
                // get the photo
                var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);
                if (photo.IsMain)
                    throw new RestException(HttpStatusCode.BadRequest, new {Photo = "This is already the main photo"});
                // get the main photo
                var currentMain = user.Photos.First(p => p.IsMain);
                currentMain.IsMain = false;
                // set photo with id to main
                photo.IsMain = true;
                // save the request
                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
    }
}