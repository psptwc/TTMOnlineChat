using Microsoft.AspNetCore.SignalR;
using TTMOnlineChat.Models;

namespace TTMOnlineChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task JoinChat(UserConnection connection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatName);

            await Clients
                .Group(connection.ChatName)
                .SendAsync("ReceiveMessage", "JoinedMessage");
        }
        public async Task Send(UserConnection connection, string message)
        {
            await Clients
                .Group(connection.ChatName)
                .SendAsync("ReceiveMessage", connection.UserName, message);
        }
    }
}