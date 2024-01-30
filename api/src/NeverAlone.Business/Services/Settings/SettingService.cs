using AutoMapper;
using NeverAlone.Business.DTO;
using NeverAlone.Data.DAL.Repositories.Settings;
using NeverAlone.Data.Models;

namespace NeverAlone.Business.Services.Settings;

public class SettingService : ISettingService
{
    private readonly ISettingRepository _settingRepository;
    private readonly IMapper _mapper;
    
    public SettingService(IMapper mapper, ISettingRepository settingRepository)
    {
        _mapper = mapper;
        _settingRepository = settingRepository;
    }

    public async Task CreateSettingsAsync(SettingDto settingDto)
    {
        var setting = _mapper.Map<SettingDto, Setting>(settingDto);
        await _settingRepository.InsertAsync(setting);
    }

    public async Task<SettingDto?> GetSettingByUserAsync(ApplicationUser user)
    {
        var setting = await _settingRepository.GetSettingByUser(user);
        var settingDto = _mapper.Map<Setting, SettingDto>(setting);
        return settingDto;
    }

    public async Task UpdateSettingsAsync(SettingDto settingDto)
    {
        var settings = _mapper.Map<SettingDto, Setting>(settingDto);
        await _settingRepository.UpdateAsync(settings);
    }
}