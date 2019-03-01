using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedDataAsync(UserManager<AppUser> userManager, DataContext context)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        UserName = "bob",
                        Email = "bob@test.com",
                    },
                    new AppUser
                    {
                        UserName = "test1",
                        Email = "test1@test.com"
                    },
                    new AppUser
                    {
                        UserName = "test2",
                        Email = "test2@test.com"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!context.Activities.Any())
            {
                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Past Activity 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivitiyAttendee>
                        {
                            new ActivitiyAttendee
                            {
                                AppUserId = 1,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Past Activity 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Activity 1 month ago",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivitiyAttendee>
                        {
                            new ActivitiyAttendee
                            {
                                AppUserId = 1,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-1)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Activity 1 month in future",
                        Category = "culture",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivitiyAttendee>
                        {
                            new ActivitiyAttendee
                            {
                                AppUserId = 1,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(1)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Activity 2 months in future",
                        Category = "food",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivitiyAttendee>
                        {
                            new ActivitiyAttendee
                            {
                                AppUserId = 2,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(2)
                            }
                        }
                    },
                                        new Activity
                    {
                        Title = "Future Activity 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Activity 3 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivitiyAttendee>
                        {
                            new ActivitiyAttendee
                            {
                                AppUserId = 3,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(3)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Activity 4 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivitiyAttendee>
                        {
                            new ActivitiyAttendee
                            {
                                AppUserId = 1,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(4)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Activity 5 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivitiyAttendee>
                        {
                            new ActivitiyAttendee
                            {
                                AppUserId = 1,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(5)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Activity 6 months in future",
                        Category = "music",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivitiyAttendee>
                        {
                            new ActivitiyAttendee
                            {
                                AppUserId = 1,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(6)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Activity 2 months ago",
                        Category = "travel",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivitiyAttendee>
                        {
                            new ActivitiyAttendee
                            {
                                AppUserId = 1,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(7)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Activity 8 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivitiyAttendee>
                        {
                            new ActivitiyAttendee
                            {
                                AppUserId = 1,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(8)
                            }
                        }
                    }
                };

                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}