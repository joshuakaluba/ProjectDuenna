using NeverAlone.Business.DTO;
using NeverAlone.Data.Models;

namespace NeverAlone.Business.Services.Monitors;

public interface IMonitorService
{
    Task CreateMonitorAsync(UserMonitorDto userMonitor);
    Task<IEnumerable<UserMonitorDto>?> GetMonitorsByUserAsync(ApplicationUser user);
    Task<UserMonitorDto?> GetMonitorByIdAsync(Guid monitorId);

    Task<UserMonitorDto?> GetActiveMonitorByUserIdAsync(string userId);

    Task UpdateMonitorAsync(UserMonitorDto userMonitorDto);

    Task<List<UserMonitor>> GetMonitorsToNotify(int minutesBeforeTrigger);

    Task DeleteMonitorAsync(UserMonitorDto userMonitorDto);
}