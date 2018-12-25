using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Application.Interfaces;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class PhotoData
        {
            public IFormFile File { get; set; }
        }

        public class Command : IRequest<Photo>
        {
            public PhotoData Photo { get; set; }
        }

        public class Handler : IRequestHandler<Command, Photo>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private readonly ICloudinaryAccessor _cloudinaryAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor, 
                IMapper mapper, ICloudinaryAccessor cloudinaryAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _mapper = mapper;
                _cloudinaryAccessor = cloudinaryAccessor;
            }

            public async Task<Photo> Handle(Command request, CancellationToken cancellationToken)
            {                
                var result = _cloudinaryAccessor.AddPhoto(request.Photo.File);
                
                var user = await _context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername(), cancellationToken);

                var photo = new Photo
                {
                    Url = result.SecureUri.ToString(),
                    DateAdded = DateTime.Now,
                    PublicId = result.PublicId
                };
                    
                if (!user.Photos.Any(x => x.IsMain))
                    photo.IsMain = true;
                
                user.Photos.Add(photo);
                
                await _context.SaveChangesAsync(cancellationToken);

                return photo;
            }
        }
    }
}