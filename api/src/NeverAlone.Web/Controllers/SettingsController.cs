using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NeverAlone.Business.DTO;
using NeverAlone.Business.Services.Settings;
using NeverAlone.Web.Services.ApplicationUserManager;

namespace NeverAlone.Web.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public sealed class SettingsController : ControllerBase
{
    private readonly ILogger<SettingsController> _logger;
    private readonly ISettingService _settingService;
    private readonly IApplicationUserManager _userManager;

    public SettingsController(ISettingService settingService,
        ILogger<SettingsController> logger,
        IApplicationUserManager userManager)
    {
        _settingService = settingService;
        _userManager = userManager;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetSettings()
    {
        var user = await _userManager.GetCurrentAuthenticatedUserAsync();
        var settings = await _settingService.GetSettingByUserAsync(user);
        return Ok(settings);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSettings(string id, SettingDto settingDto)
    {
        var settingsId = Guid.Parse(id);

        var user = await _userManager.GetCurrentAuthenticatedUserAsync();
        var settings = await _settingService.GetSettingByUserAsync(user);

        if (settings == null)
            return NotFound();

        if (settingsId != settings.Id)
            return BadRequest();

        settings.DefaultMonitorTime = settingDto.DefaultMonitorTime;
        settings.DefaultMonitorTimeRemainingReminder = settingDto.DefaultMonitorTimeRemainingReminder;

        await _settingService.UpdateSettingsAsync(settings);

        return Ok(settings);
    }
}