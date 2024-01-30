using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using NeverAlone.Data.Configuration;
using NLog;
using NLog.Web;
using LogLevel = Microsoft.Extensions.Logging.LogLevel;

namespace NeverAlone.Web;

public class Program
{
    public static void Main(string[] args)
    {
        BuildWebHost(args).Run();
    }

    public static IWebHost BuildWebHost(string[] args)
    {
        var logger = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
        logger.Debug("init main");

        try
        {
            return WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseUrls($"http://*:{ApplicationStartupOptions.Port}")
                .ConfigureLogging(logging =>
                {
                    logging.ClearProviders();
                    logging.SetMinimumLevel(LogLevel.Trace);
                })
                .UseNLog()
                .Build();
        }
        catch (Exception exception)
        {
            // NLog: catch setup errors
            logger.Error(exception, "Stopped program because of exception");
            throw;
        }
        finally
        {
            // Ensure to flush and stop internal timers/threads before application-exit (Avoid segmentation fault on Linux)
            LogManager.Shutdown();
        }
    }
}