using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NeverAlone.Data.DAL.Repositories.GenericRepository;
using NeverAlone.Data.DataContext;
using NeverAlone.Data.Models;

namespace NeverAlone.Data.DAL.Repositories.MonitoredLocations;

public class MonitorLocationRepository : BaseGenericRepository<MonitorLocation>, IMonitorLocationRepository
{
    private readonly ApplicationDbContext _context;

    public MonitorLocationRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IEnumerable<MonitorLocation>> GetMonitorLocationByMonitorIdAsync(Guid monitorId)
    {
        var monitorLocations
            = await _context.MonitorLocations
                .Where(m => m.UserMonitorId == monitorId).ToListAsync();

        return monitorLocations;
    }
}