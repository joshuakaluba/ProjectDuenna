using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Http;
using NeverAlone.Business.Mapping;
using NeverAlone.Business.Services.Caching;
using NeverAlone.Business.Services.Contacts;
using NeverAlone.Business.Services.ExpoPushNotificationTokens;
using NeverAlone.Business.Services.MonitoredLocations;
using NeverAlone.Business.Services.Monitors;
using NeverAlone.Business.Services.Notes;
using NeverAlone.Business.Services.Notifications;
using NeverAlone.Business.Services.Settings;
using NeverAlone.Business.Services.Users;
using NeverAlone.Data.DAL.Repositories.Contacts;
using NeverAlone.Data.DAL.Repositories.ExpoPushNotificationTokens;
using NeverAlone.Data.DAL.Repositories.MonitoredLocations;
using NeverAlone.Data.DAL.Repositories.Monitors;
using NeverAlone.Data.DAL.Repositories.Notes;
using NeverAlone.Data.DAL.Repositories.RefreshTokens;
using NeverAlone.Data.DAL.Repositories.Settings;
using NeverAlone.Data.DAL.Repositories.Users;
using NeverAlone.Data.DataContext;
using NeverAlone.ExpoPushNotificationWrapper;

namespace NeverAlone.Console.UserMonitorNotifications;

public class Program
{
    private static async Task Main(string[] args)
    {
        var host = CreateHostBuilder(args).Build();

        using (var scope = host.Services.CreateScope())
        {
            var services = scope.ServiceProvider;

            try
            {
                await services.GetRequiredService<App>().RunAsync();
            }
            catch (Exception ex)
            {
                System.Console.WriteLine(ex.Message);
            }
        }

        await host.RunAsync();
    }

    private static IHostBuilder CreateHostBuilder(string[] args)
    {
        return Host.CreateDefaultBuilder(args)
            .ConfigureServices((_, services) =>
            {
                services.AddHttpClient();
                services.RemoveAll<IHttpMessageHandlerBuilderFilter>();

                services.AddDbContext<ApplicationDbContext>();

                services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();

                services.AddScoped<IContactRepository, ContactRepository>();
                services.AddScoped<IContactService, ContactService>();

                services.AddScoped<IMonitorLocationRepository, MonitorLocationRepository>();
                services.AddScoped<IMonitorLocationService, MonitorLocationService>();

                services.AddScoped<INoteRepository, NoteRepository>();
                services.AddScoped<INoteService, NoteService>();

                services.AddScoped<IMonitorRepository, MonitorRepository>();
                services.AddScoped<IMonitorService, MonitorService>();


                services.AddScoped<ICacheService, CacheService>();
                services.AddScoped<ISendPushNotification, ExpoPushNotificationClient>();

                services.AddScoped<IUserRepository, UserRepository>();
                services.AddScoped<IUserService, UserService>();

                services.AddScoped<IExpoPushNotificationTokenRepository, ExpoPushNotificationTokenRepository>();
                services.AddScoped<IExpoPushNotificationTokenService, ExpoPushNotificationTokenService>();

                services.AddScoped<ISettingRepository, SettingRepository>();
                services.AddScoped<ISettingService, SettingService>();

                var mapperConfig = new MapperConfiguration(mc => { mc.AddProfile(new NeverAloneProfile()); });
                var mapper = mapperConfig.CreateMapper();
                services.AddSingleton(mapper);
                services.AddSingleton<App>();
            });
    }
}