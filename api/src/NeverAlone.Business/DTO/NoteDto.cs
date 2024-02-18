namespace NeverAlone.Business.DTO;

public class NoteDto
{
    public Guid? Id { get; set; } = Guid.NewGuid();
    public string? TextContext { get; set; }
    public Guid UserMonitorId { get; set; }

    public DateTime? DateCreated { get; set; }
}