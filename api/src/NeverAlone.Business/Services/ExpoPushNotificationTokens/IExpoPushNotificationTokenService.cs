using NeverAlone.Business.DTO;

namespace NeverAlone.Business.Services.ExpoPushNotificationTokens;

public interface IExpoPushNotificationTokenService
{
    Task CreateExpoPushNotificationTokenAsync(ExpoPushNotificationTokenDto expoPushNotificationToken);
}