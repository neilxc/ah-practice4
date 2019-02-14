using System.Threading.Tasks;
using Application.Comments;

namespace Application.Interfaces
{
    public interface IChatHub
    {
        Task SendComment(CommentDto comment);
    }
}