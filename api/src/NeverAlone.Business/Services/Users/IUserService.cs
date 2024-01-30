using Microsoft.AspNetCore.Identity;
using NeverAlone.Data.Models;

namespace NeverAlone.Business.Services.Users;

public interface IUserService
{
    Task<bool> CheckPasswordAsync(ApplicationUser user, string password);

    Task<IdentityResult> CreateUserAsync(ApplicationUser user, string password);

    Task DeactivateUserAsync(ApplicationUser user);

    Task<ApplicationUser?> FindUserByEmailAsync(string email);
}