using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class CommentData
        {
            public string Body { get; set; }
        }

        public class CommentDataValidator : AbstractValidator<CommentData>
        {
            public CommentDataValidator()
            {
                RuleFor(x => x.Body).NotNull().NotEmpty();
            }
        }

        public class Command : IRequest<CommentDto>
        {
            public CommentData Comment { get; set; }
            public int ActivityId { get; set; }
        }

        public class Handler : IRequestHandler<Command, CommentDto>
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
            
            public async Task<CommentDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.Include(x => x.Comments)
                    .FirstOrDefaultAsync(x => x.Id == request.ActivityId, cancellationToken);
                
                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Activity = "Not found"});

                var author = await _context.Users
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername(), cancellationToken);

                var comment = new Comment
                {
                    Author = author,
                    Body = request.Comment.Body,
                    CreatedAt = DateTime.Now
                };

                await _context.Comments.AddAsync(comment, cancellationToken);
                
                activity.Comments.Add(comment);

                await _context.SaveChangesAsync(cancellationToken);

                var commentDto = _mapper.Map<Comment, CommentDto>(comment);

                return commentDto;
            }
        }
    }
}