using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser<int>
    {
        public string Bio { get; set; }
        public ICollection<ActivitiyAttendee> Activities { get; set; }
    }
}