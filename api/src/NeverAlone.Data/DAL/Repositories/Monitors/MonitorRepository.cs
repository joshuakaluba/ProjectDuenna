using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NeverAlone.Data.DAL.Repositories.GenericRepository;
using NeverAlone.Data.DataContext;
using NeverAlone.Data.Models;

namespace NeverAlone.Data.DAL.Repositories.Monitors;

public class MonitorRepository : BaseGenericRepository<UserMonitor>, IMonitorRepository
{
    private readonly ApplicationDbContext _context;

    public MonitorRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<UserMonitor> GetActiveMonitorByUserAsync(ApplicationUser user)
    {
        return await GetActiveMonitorByUserIdAsync(user.Id);
    }

    public async Task<UserMonitor> GetActiveMonitorByUserIdAsync(string userId)
    {
        var monitor
            = await _context.UserMonitors
                .Where(m => m.Active && m.ApplicationUserId == userId)
                .FirstOrDefaultAsync();
        return monitor;
    }

    public async Task<IEnumerable<UserMonitor>> GetMonitorsByUserAsync(ApplicationUser user)
    {
        var monitors
            = await _context.UserMonitors
                .Where(m => m.ApplicationUserId == user.Id)
                .ToListAsync();
        return monitors;
    }

    public async Task<IEnumerable<UserMonitor>> GetMonitorsToNotify(int minutesBeforeTrigger)
    {
        var monitors = await _context.UserMonitors
            .Where(um =>
                um.TimeWillTrigger >= DateTime.UtcNow &&
                um.Active &&
                um.TimeWillTrigger <= DateTime.UtcNow.AddMinutes(minutesBeforeTrigger))
            .Include(um => um.ApplicationUser)
            .ThenInclude(u => u.ExpoPushNotificationTokens)
            .Include(um =>
                um.ApplicationUser)
            .ThenInclude(u => u.Contacts)
            .ToListAsync();
        return monitors;
    }
}