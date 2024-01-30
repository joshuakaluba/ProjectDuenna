using NeverAlone.Business.DTO;

namespace NeverAlone.Business.Services.MonitoredLocations;

public interface IMonitorLocationService
{
    Task CreateMonitoredLocationAsync(MonitorLocationDto monitorLocation);
    Task<IEnumerable<MonitorLocationDto>?> GetMonitorLocationByMonitorAsync(Guid monitorId);
}