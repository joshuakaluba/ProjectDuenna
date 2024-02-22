namespace NeverAlone.Business.Services.Notifications;

public interface ISendPushNotification
{
    Task SendPushNotification(List<string> tokens, string title, string message);
}