using System.Collections.Generic;
using System.Threading.Tasks;
using NeverAlone.Data.DAL.Repositories.GenericRepository;
using NeverAlone.Data.Models;

namespace NeverAlone.Data.DAL.Repositories.Monitors;

public interface IMonitorRepository : IGenericRepository<UserMonitor>
{
    Task<UserMonitor> GetActiveMonitorByUserAsync(ApplicationUser user);

    Task<UserMonitor> GetActiveMonitorByUserIdAsync(string userId);

    Task<IEnumerable<UserMonitor>> GetMonitorsByUserAsync(ApplicationUser user);

    Task<List<UserMonitor>> GetMonitorsToNotify(int minutesBeforeTrigger);
}