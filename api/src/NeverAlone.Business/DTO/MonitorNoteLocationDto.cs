namespace NeverAlone.Business.DTO;

public class MonitorNoteLocationDto
{
    public UserMonitorDto Monitor { get; set; }

    public IEnumerable<NoteDto>? Notes { get; set; }

    public IEnumerable<MonitorLocationDto>? Locations { get; set; }
}