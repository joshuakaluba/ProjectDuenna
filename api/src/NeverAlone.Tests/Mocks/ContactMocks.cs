using NeverAlone.Business.DTO;
using NeverAlone.Data.Models;

namespace NeverAlone.Tests.Mocks;

public static class ContactMocks
{
    public static IEnumerable<ContactDto> GetContactsByUser(ApplicationUser user)
    {
        var contactList = new List<ContactDto>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Email = "test1@kalubatech.com",
                Name = "Test 1",
                PhoneNumber = "2891235343",
                ApplicationUserId = user.Id
            },
            new()
            {
                Id = Guid.NewGuid(),
                Email = "test2@kalubatech.com",
                Name = "Test 2",
                PhoneNumber = "2891235345",
                ApplicationUserId = user.Id
            }
        };
        return contactList;
    }
}