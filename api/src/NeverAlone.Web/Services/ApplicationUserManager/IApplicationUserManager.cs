using System.Threading.Tasks;
using NeverAlone.Data.Models;

namespace NeverAlone.Web.Services.ApplicationUserManager;

public interface IApplicationUserManager
{
    Task<ApplicationUser> GetCurrentAuthenticatedUserAsync();
}