using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using NeverAlone.Data.Models;

namespace NeverAlone.Web.Services.ApplicationUserManager;

public class ApplicationUserManager : IApplicationUserManager
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<ApplicationUser> _userManager;

    public ApplicationUserManager(UserManager<ApplicationUser> userManager,
        IHttpContextAccessor httpContextAccessor)
    {
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<ApplicationUser> GetCurrentAuthenticatedUserAsync()
    {
        var email = _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null) throw new NullReferenceException("Unable to retrieve active user");

        return user;
    }
}