using System.Threading.Tasks;

namespace Application.Comments
{
    public interface IChatHub
    {
        Task SendComment(CommentDto comment);
    }
}