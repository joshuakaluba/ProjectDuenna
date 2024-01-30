namespace NeverAlone.Data.Models;

public class ExpoPushNotificationToken : Auditable
{
    public string Token { get; set; } = "";

    public string ApplicationUserId { get; set; }

    public ApplicationUser ApplicationUser { get; set; }
}