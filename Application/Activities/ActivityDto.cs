using System;
using System.Collections.Generic;
using System.Linq;
using Application.Comments;
using Domain;

namespace Application.Activities
{
    public class ActivityDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }

        public AttendeeDto Host
        {
            get { return this.Attendees.First(x => x.IsHost); }
        }

        public ICollection<AttendeeDto> Attendees { get; set; }
        public ICollection<CommentDto> Comments { get; set; }
    }
}