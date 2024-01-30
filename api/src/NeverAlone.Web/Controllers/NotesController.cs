using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NeverAlone.Business.DTO;
using NeverAlone.Business.Services.Monitors;
using NeverAlone.Business.Services.Notes;

namespace NeverAlone.Web.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class NotesController : ControllerBase
{
    private readonly ILogger<NotesController> _logger;
    private readonly IMonitorService _monitorService;
    private readonly INoteService _noteService;

    public NotesController(INoteService notesService,
        ILogger<NotesController> logger,
        IMonitorService monitorService)
    {
        _noteService = notesService;
        _logger = logger;
        _monitorService = monitorService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateMonitorLocation(NoteDto noteDto)
    {
        if (ModelState.IsValid)
        {
            var monitor = await _monitorService.GetMonitorByIdAsync(noteDto.UserMonitorId);

            if (monitor == null) return NotFound("Unable to find a valid monitor");

            noteDto.Id = Guid.NewGuid();
            await _noteService.CreateNoteAsync(noteDto);

            return Ok(noteDto);
        }

        return new JsonResult("Something went wrong") { StatusCode = 500 };
    }
}