using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NeverAlone.Business.DTO;
using NeverAlone.Business.Services.MonitoredLocations;
using NeverAlone.Business.Services.Monitors;
using NeverAlone.Business.Services.Notes;
using NeverAlone.Web.Models;

namespace NeverAlone.Web.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class MonitorsController : ControllerBase
{
    private readonly ILogger<MonitorsController> _logger;
    private readonly IMonitorLocationService _monitorLocationService;
    private readonly IMonitorService _monitorService;
    private readonly INoteService _noteService;

    public MonitorsController(IMonitorService monitorService,
        INoteService noteService,
        IMonitorLocationService monitorLocationService,
        ILogger<MonitorsController> logger
    )
    {
        _monitorService = monitorService;
        _logger = logger;
        _noteService = noteService;
        _monitorLocationService = monitorLocationService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetMonitor(Guid id)
    {
        var monitor = await _monitorService.GetMonitorByIdAsync(id);
        
        if (monitor == null)
        {
            return NotFound(new ErrorDetails
            {
                StatusCode = 404,
                Message = "Unable to find a valid monitor"
            });
        }

        var notes = await _noteService.GetNoteByMonitorAsync(id);
        var locations = await _monitorLocationService.GetMonitorLocationByMonitorAsync(id);


        var dto = new MonitorNoteLocationDto
        {
            Monitor = monitor,
            Notes = notes,
            Locations = locations
        };

        return Ok(dto);
    }
}