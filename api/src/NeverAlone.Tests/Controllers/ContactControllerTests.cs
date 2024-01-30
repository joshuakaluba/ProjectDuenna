using Microsoft.Extensions.Logging;
using Moq;
using NeverAlone.Business.Services.Contacts;
using NeverAlone.Data.Models;
using NeverAlone.Tests.Mocks;
using NeverAlone.Web.Controllers;
using NeverAlone.Web.Services.ApplicationUserManager;
using Xunit;

namespace NeverAlone.Tests.Controllers;

public class ContactControllerTests
{
    [Fact]
    public async Task GetContactsByUser()
    {
        var contactRepository = new Mock<IContactService>();

        var userManagerRepository = new Mock<IApplicationUserManager>();

        var logger = new Mock<ILogger<ContactsController>>();

        var applicationUser = new ApplicationUser
        {
            Id = Guid.NewGuid().ToString()
        };

        contactRepository.Setup(repo => repo.GetContactsByUserAsync(applicationUser))
            .ReturnsAsync(ContactMocks.GetContactsByUser(applicationUser));

        userManagerRepository.Setup(repo => repo.GetCurrentAuthenticatedUserAsync())
            .ReturnsAsync(UserManagerMocks.GetAuthenticatedUser());


        var controller = new ContactsController(contactRepository.Object, logger.Object, userManagerRepository.Object);

        // Act
        var result = await controller.GetContacts();
    }
}