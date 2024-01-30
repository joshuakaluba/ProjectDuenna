using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NeverAlone.Data.DAL.Repositories.GenericRepository;
using NeverAlone.Data.DataContext;
using NeverAlone.Data.Models;

namespace NeverAlone.Data.DAL.Repositories.Contacts;

public class ContactRepository : BaseGenericRepository<Contact>, IContactRepository
{
    private readonly ApplicationDbContext _context;

    public ContactRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Contact>> GetContactsByUserAsync(ApplicationUser user)
    {
        var contacts
            = await _context.Contacts
                .Where(contact => contact.ApplicationUserId == user.Id && contact.Active)
                .AsNoTracking()
                .OrderBy(contact => contact.Name)
                .ToListAsync();

        return contacts;
    }
}