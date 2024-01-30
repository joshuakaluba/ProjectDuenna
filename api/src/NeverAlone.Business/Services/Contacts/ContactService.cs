using AutoMapper;
using NeverAlone.Business.DTO;
using NeverAlone.Data.DAL.Repositories.Contacts;
using NeverAlone.Data.Models;

namespace NeverAlone.Business.Services.Contacts;

public class ContactService : IContactService
{
    private readonly IContactRepository _contactRepository;
    private readonly IMapper _mapper;

    public ContactService(IMapper mapper,
        IContactRepository contactRepository
    )
    {
        _mapper = mapper;
        _contactRepository = contactRepository;
    }

    public async Task CreateContactAsync(ContactDto contactDto)
    {
        var contact = _mapper.Map<ContactDto, Contact>(contactDto);
        await _contactRepository.InsertAsync(contact);
    }

    public async Task<IEnumerable<ContactDto>?> GetContactsByUserAsync(ApplicationUser user)
    {
        var contacts = await _contactRepository.GetContactsByUserAsync(user);
        var contactsDto = _mapper.Map<IEnumerable<Contact>, IEnumerable<ContactDto>>(contacts);

        return contactsDto;
    }

    public async Task UpdateContactAsync(ContactDto contactDto)
    {
        var contact = _mapper.Map<ContactDto, Contact>(contactDto);
        await _contactRepository.UpdateAsync(contact);
    }

    public async Task DeleteContactAsync(ContactDto contactDto)
    {
        var contact = _mapper.Map<ContactDto, Contact>(contactDto);
        await _contactRepository.DeleteAsync(contact.Id);
    }

    public async Task<ContactDto?> GetContactByIdAsync(Guid id)
    {
        var contact = await _contactRepository.GetByIdAsync(id);
        var contactDto = _mapper.Map<Contact, ContactDto>(contact);

        return contactDto;
    }
}