using Application.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace Application.Comments
{
    public class ChatHub : Hub<IChatHub>
    {
        public void SendToAll(CommentDto comment)
        {
            Clients.All.SendComment(comment);
        }
    }
}