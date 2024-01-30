using AutoMapper;
using NeverAlone.Business.DTO;
using NeverAlone.Data.DAL.Repositories.MonitoredLocations;
using NeverAlone.Data.Models;

namespace NeverAlone.Business.Services.MonitoredLocations;

public class MonitorLocationService : IMonitorLocationService
{
    private readonly IMapper _mapper;
    private readonly IMonitorLocationRepository _monitorLocationRepository;

    public MonitorLocationService(IMapper mapper,
        IMonitorLocationRepository monitorLocationRepository)
    {
        _mapper = mapper;
        _monitorLocationRepository = monitorLocationRepository;
    }

    public async Task CreateMonitoredLocationAsync(MonitorLocationDto monitorLocation)
    {
        var location = _mapper.Map<MonitorLocationDto, MonitorLocation>(monitorLocation);
        await _monitorLocationRepository.InsertAsync(location);
    }

    public async Task<IEnumerable<MonitorLocationDto>?> GetMonitorLocationByMonitorAsync(Guid monitorId)
    {
        var monitorLocations = await _monitorLocationRepository.GetMonitorLocationByMonitorIdAsync(monitorId);
        var monitorLocationsDto =
            _mapper.Map<IEnumerable<MonitorLocation>, IEnumerable<MonitorLocationDto>>(monitorLocations);

        return monitorLocationsDto;
    }
}