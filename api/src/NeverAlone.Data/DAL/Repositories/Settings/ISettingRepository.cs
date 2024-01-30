using System.Threading.Tasks;
using NeverAlone.Data.DAL.Repositories.GenericRepository;
using NeverAlone.Data.Models;

namespace NeverAlone.Data.DAL.Repositories.Settings;

public interface ISettingRepository : IGenericRepository<Setting>
{
    Task<Setting> GetSettingByUser(ApplicationUser user);
}