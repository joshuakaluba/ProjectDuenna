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
        var monitors = await _monitorService.GetMonitorsToNotify(15);

        var tokens = monitors.SelectMany(m => m.ApplicationUser.ExpoPushNotificationTokens)
            .Select(t => t.Token)
            .ToList();

        const string title = "Are you doing okay?";
        const string message =
            "You have a monitor that will trigger soon. Please add more time or cancel the monitor if you are okay";

        await _sendPushNotification.SendPushNotification(tokens, title, message);
        await _monitorService.UpdateMonitorReminderNotified(monitors);
    }
}