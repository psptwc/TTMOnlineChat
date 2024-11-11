using TTMOnlineChat.Hubs;

namespace TTMOnlineChat
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddSignalR(); // Services SignalR connected

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.MapHub<ChatHub>("/chatHub"); // ChatHub handles requests at /chat

            app.Run();
        }
    }
}
