using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NeverAlone.Business.DTO;
using NeverAlone.Business.Exceptions;
using NeverAlone.Business.Services.Monitors;
using NeverAlone.Data.Models;
using NeverAlone.Web.Services.ApplicationUserManager;

namespace NeverAlone.Web.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class UserMonitorsController : ControllerBase
{
    private readonly ILogger<UserMonitorsController> _logger;
    private readonly IMonitorService _monitorService;
    private readonly IApplicationUserManager _userManager;

    public UserMonitorsController(IMonitorService monitorService,
        ILogger<UserMonitorsController> logger,
        IApplicationUserManager userManager)
    {
        _monitorService = monitorService;
        _userManager = userManager;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetMonitors()
    {
        var user = await _userManager.GetCurrentAuthenticatedUserAsync();
        var monitors = await _monitorService.GetMonitorsByUserAsync(user);
        return Ok(monitors);
    }

    [HttpGet]
    [Route("Active")]
    public async Task<IActionResult> GetActiveMonitor()
    {
        var user = await _userManager.GetCurrentAuthenticatedUserAsync();
        var monitor = await _monitorService.GetActiveMonitorByUserIdAsync(user.Id);
        return Ok(monitor);
    }

    [HttpPost]
    [Route("Panic")]
    public async Task<IActionResult> Panic(UserMonitorDto monitorDto)
    {
        // TODO flesh this out more once we get proper triggering
        return Ok("Panic created successfully");
    }

    [HttpPost]
    public async Task<IActionResult> CreateMonitor(UserMonitorDto monitorDto)
    {
        try
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.GetCurrentAuthenticatedUserAsync();

                monitorDto.Id = Guid.NewGuid();
                monitorDto.ApplicationUserId = user.Id;
                monitorDto.IsTriggered = false;
                monitorDto.Active = true;
                var triggerMinutes = monitorDto.MinutesToAdd > 0 ? monitorDto.MinutesToAdd : 120;
                monitorDto.TimeWillTrigger = DateTime.UtcNow.AddMinutes(triggerMinutes);
                monitorDto.CreatedAt = DateTime.UtcNow;

                await _monitorService.CreateMonitorAsync(monitorDto);
                return Ok(monitorDto);
            }

            return new JsonResult("Unable to create Monitor") { StatusCode = 500 };
        }
        catch (MultipleActiveMonitorsException e)
        {
            return BadRequest(new ResponseMessage(e));
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMonitor(string id, UserMonitorDto userMonitorDto)
    {
        var monitorId = Guid.Parse(id);
        if (monitorId != userMonitorDto.Id)
            return BadRequest();

        var existingMonitor = await _monitorService.GetMonitorByIdAsync(monitorId);
        if (existingMonitor == null)
            return NotFound();

        existingMonitor.Active = userMonitorDto.Active;

        if (existingMonitor.Active && userMonitorDto.MinutesToAdd > 0)
            existingMonitor.TimeWillTrigger = existingMonitor.TimeWillTrigger.AddMinutes(userMonitorDto.MinutesToAdd);

        await _monitorService.UpdateMonitorAsync(existingMonitor);

        return Ok(existingMonitor);
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMonitor(string id)
    {
        var user = await _userManager.GetCurrentAuthenticatedUserAsync();
        var existingMonitor = await _monitorService.GetMonitorByIdAsync(Guid.Parse(id));

        if (existingMonitor == null) return NotFound();

        if (existingMonitor.ApplicationUserId != user.Id) return Forbid();

        await _monitorService.DeleteMonitorAsync(existingMonitor);

        return Ok(existingMonitor);
    }
}