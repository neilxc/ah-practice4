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

namespace Application.Users
{
    public class Edit
    {
//        public class UserData
//        {
//            public string Bio { get; set; }
//            public string Gender { get; set; }
//            public string Occupation { get; set; }
//            public string Origin { get; set; }
//            public string City { get; set; }
//            public string Status { get; set; }
//            public DateTime? DateOfBirth { get; set; }
//        }

        public class Command : IRequest<User>
        {
            public string Bio { get; set; }
            public string Gender { get; set; }
            public string Occupation { get; set; }
            public string Origin { get; set; }
            public string City { get; set; }
            public string Status { get; set; }
            public DateTime? DateOfBirth { get; set; }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper, IJwtGenerator jwtGenerator)
            {
                _context = context;
                _userAccessor = userAccessor;
                _mapper = mapper;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetCurrentUsername(), cancellationToken);

                user.Bio = request.Bio ?? user.Bio;
                user.Gender = request.Gender ?? user.Gender;
                user.Occupation = request.Occupation ?? user.Occupation;
                user.Origin = request.Origin ?? user.Origin;
                user.DateOfBirth = request.DateOfBirth ?? user.DateOfBirth;
                user.City = request.City ?? user.City;
                user.Status = request.Status ?? user.Status;

                await _context.SaveChangesAsync(cancellationToken);

                var userToReturn = _mapper.Map<AppUser, User>(user);
                userToReturn.Token = _jwtGenerator.CreateToken(user);

                return userToReturn;
            }
        }
    }
}