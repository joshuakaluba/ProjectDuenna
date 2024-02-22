using System.Threading.Tasks;
using NeverAlone.Business.Services.Monitors;

namespace NeverAlone.Console.UserMonitorNotifications;

public class App
{
    private readonly IMonitorService _monitorService;

    public App(IMonitorService monitorService)
    {
        _monitorService = monitorService;
    }

    public async Task RunAsync()
    {
        var monitors = await _monitorService.GetMonitorsToNotify(120);
        foreach (var monitor in monitors)
        {
            System.Console.WriteLine($"Monitor {monitor.Id} is due to trigger in 120 minutes");
        }
    }
}