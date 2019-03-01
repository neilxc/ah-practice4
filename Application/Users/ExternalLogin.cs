using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Values;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Persistence;

namespace Application.Users
{
    public class ExternalLogin
    {
        public class Command : IRequest<User>
        {
            public string Email { get; set; }
            public string Provider { get; set; }
            public string AccessToken { get; set; }
            public string UserImage { get; set; }
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly SignInManager<AppUser> _signInManager;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IConfiguration _configuration;
            private readonly DataContext _context;

            public Handler(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager,
                IJwtGenerator jwtGenerator, IConfiguration configuration, DataContext context)
            {
                _signInManager = signInManager;
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
                _configuration = configuration;
                _context = context;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                // set up base address for fb
                var httpClient = new HttpClient {BaseAddress = new Uri("https://graph.facebook.com/v2.9/")};

                // get a client access token from the server to compare against the user token
                var appAccessTokenResponse =
                    await httpClient.GetStringAsync(
                        $"oauth/access_token?client_id={_configuration["Authentication:Facebook:AppId"]}" +
                        $"&client_secret={_configuration["Authentication:Facebook:AppSecret"]}" +
                        "&grant_type=client_credentials");

                var appAccessToken = JsonConvert.DeserializeObject<FacebookAppAccessToken>(appAccessTokenResponse);
                
//                var res = await httpClient.GetStringAsync(
//                    $"debug_token?input_token={request.AccessToken}&access_token={appAccessToken.AccessToken}");

                var userAccessTokenValidationResponse =
                    await httpClient.GetStringAsync(
                        $"debug_token?input_token={request.AccessToken}&access_token={appAccessToken.AccessToken}");

                var userAccessTokenValidation =
                    JsonConvert.DeserializeObject<FacebookUserAccessTokenValidation>(userAccessTokenValidationResponse);

                if (!userAccessTokenValidation.Data.IsValid)
                    throw new RestException(HttpStatusCode.Unauthorized, new {User = "Login failure"});

                var userInfoResponse =
                    await httpClient.GetStringAsync(
                        $"me?access_token={request.AccessToken}&fields=id,name,email,picture");

                var userInfo = JsonConvert.DeserializeObject<FacebookUserData>(userInfoResponse);

                var user = await _userManager.FindByEmailAsync(request.Email);

                if (user == null)
                {
                    // do not have external login for this user so need to create one
                    var photo = new Photo
                    {
                        Url = request.UserImage,
                        DateAdded = DateTime.Now,
                        PublicId = null,
                        IsMain = true
                    };

                    // create new user in our application
                    var appUser = new AppUser
                    {
                        Email = request.Email,
                        UserName = request.Email,
                        RefreshToken = _jwtGenerator.GenerateRefreshToken(),
                        RefreshTokenExpiry = DateTime.UtcNow.AddDays(7),
                        EmailConfirmed = true
                    };

                    var identityResult = await _userManager.CreateAsync(appUser);
                    
                    if (!identityResult.Succeeded)
                        throw new RestException(HttpStatusCode.BadRequest, new {User = "Problem creating account"});
                    
                    // get the user so that we can add the photo

                    var userFromDb = await _context.Users.Include(p => p.Photos)
                        .FirstOrDefaultAsync(x => x.UserName == userInfo.Email, cancellationToken);
                    
                    userFromDb.Photos.Add(photo);

                    await _context.SaveChangesAsync(cancellationToken);
                }

                var localUser = await _userManager.FindByEmailAsync(request.Email);

                if (localUser == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {User = "Did not find user in db"});
                }

                return new User
                {
                    Username = localUser.UserName,
                    DisplayName = localUser.DisplayName,
                    Token = _jwtGenerator.CreateToken(localUser),
                    RefreshToken = localUser.RefreshToken,
                    RefreshTokenExpiry = localUser.RefreshTokenExpiry
                };
            }
        }
    }
}