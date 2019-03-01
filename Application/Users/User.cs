using System;
using System.Collections.Generic;
using Domain;

namespace Application.Users
{
    public class User
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public string Bio { get; set; }
        public string Status { get; set; }
        public string Gender { get; set; }
        public string Occupation { get; set; }
        public string City { get; set; }
        public string Origin { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Image { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiry { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}