using TTMOnlineChat.Hubs;

namespace TTMOnlineChat
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            builder.Services.AddSignalR(); // Services SignalR connected

            var app = builder.Build();

            app.UseCors();

            app.MapHub<ChatHub>("/chat"); // ChatHub handles requests at /chat

            app.Run();
        }
    }
}
