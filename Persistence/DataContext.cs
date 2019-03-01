using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser, IdentityRole<int>, int>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivitiyAttendee> Attendees { get; set; }
        public DbSet<FollowedPeople> FollowedPeople { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Value>()
                .HasData(
                    new Value {Id = 1, Name = "Value 101"},
                    new Value {Id = 2, Name = "Value 102"},
                    new Value {Id = 3, Name = "Value 103"}
                );

            builder.Entity<ActivitiyAttendee>(x => x.HasKey(aa => new {aa.ActivityId, aa.AppUserId}));

            builder.Entity<ActivitiyAttendee>()
                .HasOne(a => a.Activity)
                .WithMany(b => b.Attendees)
                .HasForeignKey(a => a.ActivityId)
                .OnDelete(DeleteBehavior.Restrict);
            
//            builder.Entity<ActivitiyAttendee>()
//                .HasOne(a => a.AppUser)
//                .WithMany(b => b.Activities)
//                .HasForeignKey(a => a.AppUserId)
//                .OnDelete(DeleteBehavior.Restrict);
            
            builder.Entity<FollowedPeople>(b =>
            {
                b.HasKey(k => new {k.ObserverId, k.TargetId});
                
                b.HasOne(o => o.Observer)
                    .WithMany(f => f.Following)
                    .HasForeignKey(o => o.ObserverId)
                    .OnDelete(DeleteBehavior.Restrict);

                b.HasOne(t => t.Target)
                    .WithMany(f => f.Followers)
                    .HasForeignKey(t => t.TargetId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
