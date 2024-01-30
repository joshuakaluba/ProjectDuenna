using System.Threading.Tasks;
using NeverAlone.Data.Models;

namespace NeverAlone.Data.DAL.Repositories.Users;

public interface IUserRepository
{
    Task DeactivateUserAsync(ApplicationUser user);
}