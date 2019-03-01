using System.Linq;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public static class ActivityExtensions
    {
        public static IQueryable<Activity> GetAllData(this DbSet<Activity> activities)
        {
            return activities
                .Include(x => x.Attendees)
                .ThenInclude(x => x.AppUser)
                .ThenInclude(x => x.Photos)
                .Include(c => c.Comments)
                .ThenInclude(a => a.Author)
                .ThenInclude(a => a.Photos)
                .AsNoTracking();
        }
    }
}