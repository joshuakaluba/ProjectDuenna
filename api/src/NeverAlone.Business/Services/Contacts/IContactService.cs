using NeverAlone.Business.DTO;
using NeverAlone.Data.Models;

namespace NeverAlone.Business.Services.Contacts;

public interface IContactService
{
    Task CreateContactAsync(ContactDto contact);
    Task<IEnumerable<ContactDto>?> GetContactsByUserAsync(ApplicationUser user);
    Task<ContactDto?> GetContactByIdAsync(Guid id);
    Task UpdateContactAsync(ContactDto contactDto);

    Task DeleteContactAsync(ContactDto contactDto);
}