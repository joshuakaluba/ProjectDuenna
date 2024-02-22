using System.Linq;
using System.Threading.Tasks;
using NeverAlone.Business.Services.Monitors;
using NeverAlone.Business.Services.Notifications;

namespace NeverAlone.Console.UserMonitorNotifications;

public class App
{
    private readonly IMonitorService _monitorService;
    private readonly ISendPushNotification _sendPushNotification;

    public App(IMonitorService monitorService, ISendPushNotification sendPushNotification)
    {
        _monitorService = monitorService;
        _sendPushNotification = sendPushNotification;
    }

    public async Task RunAsync()
    {
        var monitors = await _monitorService.GetMonitorsToNotify(60);

        var tokens = monitors.SelectMany(m => m.ApplicationUser.ExpoPushNotificationTokens)
            .Select(t => t.Token)
            .ToList();
        
        await _sendPushNotification.SendPushNotification(tokens, "Are you doing okay?", "You have a monitor that will trigger soon. Please add more time or cancel the monitor if you are okay");
    }
}