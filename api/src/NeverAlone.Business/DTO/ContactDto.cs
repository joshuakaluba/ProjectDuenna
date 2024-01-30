namespace NeverAlone.Business.DTO;

public class ContactDto
{
    public Guid? Id { get; set; } = Guid.NewGuid();
    public string? Name { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? ApplicationUserId { get; set; }
}