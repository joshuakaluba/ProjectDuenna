using System.Threading.Tasks;
using NeverAlone.Data.DataContext;
using NeverAlone.Data.Models;

namespace NeverAlone.Data.DAL.Repositories.Users;

public sealed class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task DeactivateUserAsync(ApplicationUser user)
    {
        user.Active = false;
        _context.Users.Update(user);
        await _context.SaveChangesAsync();

        // TODO refactor so we can revoke active
    }
}