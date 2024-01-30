using System.Collections.Generic;
using System.Threading.Tasks;
using NeverAlone.Data.DAL.Repositories.GenericRepository;
using NeverAlone.Data.Models;

namespace NeverAlone.Data.DAL.Repositories.Contacts;

public interface IContactRepository : IGenericRepository<Contact>
{
    Task<IEnumerable<Contact>> GetContactsByUserAsync(ApplicationUser user);
}