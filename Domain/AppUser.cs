using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser<int>
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Gender { get; set; }
        public string Occupation { get; set; }
        public string Origin { get; set; }
        public string City { get; set; }
        public string Status { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public ICollection<FollowedPeople> Following { get; set; }
        public ICollection<FollowedPeople> Followers { get; set; }
        public ICollection<Photo> Photos { get; set; }
//        public ICollection<ActivitiyAttendee> Activities { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiry { get; set; }
    }
}