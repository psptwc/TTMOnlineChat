using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;
using TTMOnlineChat.Models;

namespace TTMOnlineChat.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IDistributedCache _cache;
        public ChatHub(IDistributedCache cache)
        {
            _cache = cache;
        }
        public async Task JoinChat(UserConnection connection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatName);

            var stringConnection = JsonSerializer.Serialize(connection);
            await _cache.SetStringAsync(Context.ConnectionId, stringConnection);

            await Clients
                .Group(connection.ChatName)
                .SendAsync("ReceiveMessage",connection.UserName, $"{connection.UserName} joined chat");
        }
        public async Task SendMessage(string message)
        {
            var stringConnection = await _cache.GetAsync(Context.ConnectionId);
            var connection = JsonSerializer.Deserialize<UserConnection>(stringConnection);

            if (connection != null)
            {
                await Clients
                .Group(connection.ChatName)
                .SendAsync("ReceiveMessage", connection.UserName, message);
            }
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var stringConnection = await _cache.GetAsync(Context.ConnectionId);
            var connection = JsonSerializer.Deserialize<UserConnection>(stringConnection);

            if (connection != null)
            {
                await _cache.RemoveAsync(Context.ConnectionId);
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, connection.ChatName);

                await Clients
                .Group(connection.ChatName)
                .SendAsync("ReceiveMessage", connection.UserName, $"{connection.UserName} left chat");
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}