using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NeverAlone.Business.DTO;
using NeverAlone.Business.Services.MonitoredLocations;
using NeverAlone.Business.Services.Monitors;

namespace NeverAlone.Web.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class MonitorLocationsController : ControllerBase
{
    private readonly ILogger<MonitorLocationsController> _logger;
    private readonly IMonitorLocationService _monitorLocationService;
    private readonly IMonitorService _monitorService;

    public MonitorLocationsController(IMonitorLocationService monitorLocationService,
        ILogger<MonitorLocationsController> logger,
        IMonitorService monitorService)
    {
        _monitorLocationService = monitorLocationService;
        _logger = logger;
        _monitorService = monitorService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateMonitorLocation(MonitorLocationDto monitorLocationDto)
    {
        if (ModelState.IsValid)
        {
            var monitor = await _monitorService.GetMonitorByIdAsync(monitorLocationDto.UserMonitorId);

            if (monitor == null) return NotFound("Unable to find a valid monitor");

            monitorLocationDto.Id = Guid.NewGuid();
            await _monitorLocationService.CreateMonitoredLocationAsync(monitorLocationDto);

            return Ok(monitorLocationDto);
        }

        return new JsonResult("Something went wrong") { StatusCode = 500 };
    }
}