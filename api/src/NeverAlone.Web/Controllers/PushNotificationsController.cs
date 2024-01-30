using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NeverAlone.Business.DTO;
using NeverAlone.Business.Services.ExpoPushNotificationTokens;
using NeverAlone.Web.Services.ApplicationUserManager;

namespace NeverAlone.Web.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class PushNotificationsController : ControllerBase
{
    private readonly ILogger<PushNotificationsController> _logger;
    private readonly IExpoPushNotificationTokenService _expoPushNotificationTokenServiceService;
    private readonly IApplicationUserManager _userManager;

    public PushNotificationsController(IExpoPushNotificationTokenService expoPushNotificationService,
        IApplicationUserManager userManager,
        ILogger<PushNotificationsController> logger)
    {
        _expoPushNotificationTokenServiceService = expoPushNotificationService;
        _userManager = userManager;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> CreatePushNotificationToken(ExpoPushNotificationTokenDto expoPushNotificationTokenDto)
    {
        try
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.GetCurrentAuthenticatedUserAsync();
                expoPushNotificationTokenDto.ApplicationUserId = user.Id;

                await _expoPushNotificationTokenServiceService.CreateExpoPushNotificationTokenAsync(
                    expoPushNotificationTokenDto);

                return Ok(expoPushNotificationTokenDto);
            }

            return new JsonResult("Something went wrong") { StatusCode = 500 };
        }
        catch (Exception e)
        {
            if (e.InnerException != null && e.InnerException.Message.Contains("IX_Expo"))
            {
                return Ok(expoPushNotificationTokenDto);
            }
            
            _logger.LogError(e.InnerException.Message);
            Console.WriteLine(e);
            throw;
        }
    }
}