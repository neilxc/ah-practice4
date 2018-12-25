using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile :  Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.ActivityData, Activity>();
            CreateMap<Activity, ActivityDto>();
            CreateMap<ActivitiyAttendee, AttendeeDto>()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.AppUser.UserName))
                .ForMember(dest => dest.Image,
                    opt => opt.MapFrom(src => src.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}