using System.Threading;
using Application.Comments;
using Application.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace Infrastructure.SignalR
{
    public class ChatHub : Hub<IChatHub>
    {
        public void SendToAll(CommentDto comment)
        {
            Clients.All.SendComment(comment);
        }
    }
}