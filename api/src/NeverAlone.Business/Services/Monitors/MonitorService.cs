using AutoMapper;
using NeverAlone.Business.DTO;
using NeverAlone.Business.Exceptions;
using NeverAlone.Data.DAL.Repositories.Monitors;
using NeverAlone.Data.Models;

namespace NeverAlone.Business.Services.Monitors;

public class MonitorService : IMonitorService
{
    private readonly IMapper _mapper;
    private readonly IMonitorRepository _monitorRepository;

    public MonitorService(IMapper mapper,
        IMonitorRepository monitorRepository
    )
    {
        _mapper = mapper;
        _monitorRepository = monitorRepository;
    }

    public async Task CreateMonitorAsync(UserMonitorDto userMonitorDto)
    {
        var activeMonitor
            = await _monitorRepository
                .GetActiveMonitorByUserIdAsync(userMonitorDto.ApplicationUserId);

        if (activeMonitor != null)
            throw new MultipleActiveMonitorsException("You may not have multiple active monitors simultaneously");

        var monitor = _mapper.Map<UserMonitorDto, UserMonitor>(userMonitorDto);
        await _monitorRepository.InsertAsync(monitor);
    }

    public async Task<IEnumerable<UserMonitorDto>?> GetMonitorsByUserAsync(ApplicationUser user)
    {
        var monitors = await _monitorRepository.GetMonitorsByUserAsync(user);
        var monitorsDto = _mapper.Map<IEnumerable<UserMonitor>, IEnumerable<UserMonitorDto>>(monitors);

        return monitorsDto;
    }

    public async Task<UserMonitorDto?> GetMonitorByIdAsync(Guid id)
    {
        var monitor = await _monitorRepository.GetByIdAsync(id);
        var userMonitorDto = _mapper.Map<UserMonitor, UserMonitorDto>(monitor);

        return userMonitorDto;
    }

    public async Task<UserMonitorDto?> GetActiveMonitorByUserIdAsync(string userId)
    {
        var monitor = await _monitorRepository.GetActiveMonitorByUserIdAsync(userId);
        var userMonitorDto = _mapper.Map<UserMonitor, UserMonitorDto>(monitor);

        return userMonitorDto;
    }

    public async Task UpdateMonitorAsync(UserMonitorDto userMonitorDto)
    {
        var monitor = _mapper.Map<UserMonitorDto, UserMonitor>(userMonitorDto);
        await _monitorRepository.UpdateAsync(monitor);
    }

    public async Task<List<UserMonitor>> GetMonitorsToNotify(int minutesBeforeTrigger)
    {
        return await _monitorRepository.GetMonitorsToNotify(minutesBeforeTrigger);
    }

    public async Task DeleteMonitorAsync(UserMonitorDto userMonitorDto)
    {
        var monitor = _mapper.Map<UserMonitorDto, UserMonitor>(userMonitorDto);
        await _monitorRepository.DeleteAsync(monitor.Id);
    }
}