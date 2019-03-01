using System.Collections.Generic;
using Domain;
using Newtonsoft.Json;

namespace Application.Profiles
{
    public class Profile
    {
        public string Username { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
        
        [JsonProperty("following")]
        public bool IsFollowed { get; set; }

        public ICollection<Photo> Photos { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
    }
}   