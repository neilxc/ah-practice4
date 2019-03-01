using AutoMapper;
using Domain;

namespace Application.Followers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<FollowedPeople, FollowDto>()
                .ForMember(d => d.Username, 
                    o => o.MapFrom(s => s.Observer.UserName));
        }
    }
}