using NeverAlone.Business.DTO;
using NeverAlone.Data.Models;

namespace NeverAlone.Business.Services.Settings;

public interface ISettingService
{
    Task CreateSettingsAsync(SettingDto setting);

    Task UpdateSettingsAsync(SettingDto settingDto);
    
    Task<SettingDto?> GetSettingByUserAsync(ApplicationUser user);
}