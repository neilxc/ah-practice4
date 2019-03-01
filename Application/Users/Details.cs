using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users
{
    public class Details
    {
        public class Query : IRequest<User>{}

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IJwtGenerator jwtGenerator, IMapper mapper)
            {
                _context = context;
                _userAccessor = userAccessor;
                _jwtGenerator = jwtGenerator;
                _mapper = mapper;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var userFromDb = await _context.Users.AsNoTracking()
                    .Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername(), cancellationToken);

                var user = _mapper.Map<AppUser, User>(userFromDb);
                user.Token = _jwtGenerator.CreateToken(userFromDb);

                return user;
            }
        }
    }
}