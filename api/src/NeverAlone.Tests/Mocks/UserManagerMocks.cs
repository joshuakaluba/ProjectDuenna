using NeverAlone.Data.Models;

namespace NeverAlone.Tests.Mocks;

public static class UserManagerMocks
{
    public static ApplicationUser GetAuthenticatedUser()
    {
        var applicationUser = new ApplicationUser
        {
            Id = Guid.NewGuid().ToString()
        };

        return applicationUser;
    }
}