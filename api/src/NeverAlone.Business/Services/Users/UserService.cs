using Microsoft.AspNetCore.Identity;
using NeverAlone.Business.DTO;
using NeverAlone.Business.Services.Settings;
using NeverAlone.Data.DAL.Repositories.Users;
using NeverAlone.Data.Models;

namespace NeverAlone.Business.Services.Users;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ISettingService _settingService;

    public UserService(IUserRepository userRepository, 
        ISettingService settingService,
        UserManager<ApplicationUser> userManager)
    {
        _userRepository = userRepository;
        _userManager = userManager;
        _settingService = settingService;
    }

    public async Task<bool> CheckPasswordAsync(ApplicationUser user, string password)
    {
        return await _userManager.CheckPasswordAsync(user, password);
    }

    public async Task<IdentityResult> CreateUserAsync(ApplicationUser user, string password)
    {
        var createdUser = await _userManager.CreateAsync(user, password);
        var existingUser = await FindUserByEmailAsync(user.Email);
        
        
        var setting = new SettingDto
        {
            ApplicationUserId = existingUser?.Id,
            DefaultMonitorTime = 120,
            DefaultMonitorTimeRemainingReminder = 15
        };

        await _settingService.CreateSettingsAsync(setting);
        return createdUser;
    }

    public async Task DeactivateUserAsync(ApplicationUser user)
    {
        await _userRepository.DeactivateUserAsync(user);
    }

    public async Task<ApplicationUser?> FindUserByEmailAsync(string email)
    {
        return await _userManager.FindByEmailAsync(email);
    }
}