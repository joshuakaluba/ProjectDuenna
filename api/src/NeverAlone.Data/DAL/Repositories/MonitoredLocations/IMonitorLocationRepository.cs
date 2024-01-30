using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NeverAlone.Data.DAL.Repositories.GenericRepository;
using NeverAlone.Data.Models;

namespace NeverAlone.Data.DAL.Repositories.MonitoredLocations;

public interface IMonitorLocationRepository : IGenericRepository<MonitorLocation>
{
    Task<IEnumerable<MonitorLocation>> GetMonitorLocationByMonitorIdAsync(Guid monitorId);
}