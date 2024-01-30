using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NeverAlone.Business.DTO;
using NeverAlone.Business.Services.Contacts;
using NeverAlone.Data.Models;
using NeverAlone.Web.Controllers;
using NeverAlone.Web.Services.ApplicationUserManager;
using Xunit;

namespace NeverAlone.Tests.Controllers;

public class ContactsControllerTests
{
    private readonly Mock<IContactService> _contactServiceMock;
    private readonly ContactsController _controller;
    private readonly Mock<ILogger<ContactsController>> _loggerMock;
    private readonly Mock<IApplicationUserManager> _userManagerMock;

    public ContactsControllerTests()
    {
        _contactServiceMock = new Mock<IContactService>();
        _userManagerMock = new Mock<IApplicationUserManager>();
        _loggerMock = new Mock<ILogger<ContactsController>>();
        _controller = new ContactsController(
            _contactServiceMock.Object,
            _loggerMock.Object,
            _userManagerMock.Object);
    }

    [Fact]
    public async Task GetContacts_ShouldReturnOkObjectResult_WithListOfContacts()
    {
        // Arrange
        var user = new ApplicationUser { Id = Guid.NewGuid().ToString() };
        _userManagerMock
            .Setup(x => x.GetCurrentAuthenticatedUserAsync())
            .ReturnsAsync(user);

        var contacts = new List<ContactDto>
        {
            new()
            {
                Id = Guid.NewGuid(),
                ApplicationUserId = user.Id,
                Name = "John Doe",
                Email = "john.doe@example.com",
                PhoneNumber = "555-1234"
            },
            new()
            {
                Id = Guid.NewGuid(),
                ApplicationUserId = user.Id,
                Name = "Jane Smith",
                Email = "jane.smith@example.com",
                PhoneNumber = "555-5678"
            }
        };
        _contactServiceMock
            .Setup(x => x.GetContactsByUserAsync(user))
            .ReturnsAsync(contacts);

        // Act
        var result = await _controller.GetContacts();

        // Assert
        Assert.IsType<OkObjectResult>(result);
        var okResult = (OkObjectResult)result;
        Assert.Equal(contacts, okResult.Value);
    }

    [Fact]
    public async Task CreateContact_WithValidModel_ShouldReturnOkObjectResult_WithListOfContacts()
    {
        // Arrange
        var user = new ApplicationUser { Id = Guid.NewGuid().ToString() };
        _userManagerMock
            .Setup(x => x.GetCurrentAuthenticatedUserAsync())
            .ReturnsAsync(user);

        var contacts = new List<ContactDto>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Name = "John Doe",
                Email = "john.doe@example.com",
                PhoneNumber = "555-1234"
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Jane Smith",
                Email = "jane.smith@example.com",
                PhoneNumber = "555-5678"
            }
        };

        // Act
        var result = await _controller.CreateContact(contacts);

        // Assert
        Assert.IsType<OkObjectResult>(result);
        var okResult = (OkObjectResult)result;
        Assert.Equal(contacts, okResult.Value);
    }
}