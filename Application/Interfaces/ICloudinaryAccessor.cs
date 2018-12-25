using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface ICloudinaryAccessor
    {    
        ImageUploadResult AddPhoto(IFormFile file);    
        string DeletePhoto(string publicId);        
    }    
}    