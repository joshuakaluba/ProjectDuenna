using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NeverAlone.Data.DAL.Repositories.GenericRepository;
using NeverAlone.Data.DataContext;
using NeverAlone.Data.Models;

namespace NeverAlone.Data.DAL.Repositories.Settings;

public sealed class SettingRepository : BaseGenericRepository<Setting>, ISettingRepository
{
    private readonly ApplicationDbContext _context;

    public SettingRepository(ApplicationDbContext context)
        : base(context)
    {
        _context = context;
    }

    public async Task<Setting> GetSettingByUser(ApplicationUser user)
    {
        var setting = await _context.Settings
            .Where(s => s.ApplicationUserId == user.Id)
            .AsNoTracking()
            .FirstOrDefaultAsync();

        return setting;
    }
}