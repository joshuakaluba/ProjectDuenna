namespace NeverAlone.Data.Models;

public sealed class Contact : Auditable
{
    public string Name { get; set; }

    public string PhoneNumber { get; set; }

    public string Email { get; set; }
    public string ApplicationUserId { get; set; }

    public ApplicationUser ApplicationUser { get; set; }
}