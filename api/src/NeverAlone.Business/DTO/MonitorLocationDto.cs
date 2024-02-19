namespace NeverAlone.Business.DTO;

public class MonitorLocationDto
{
    public Guid? Id { get; set; } = Guid.NewGuid();

    public double Latitude { get; set; }

    public double Longitude { get; set; }

    public DateTime? DateCreated { get; set; } = DateTime.UtcNow;
    public Guid UserMonitorId { get; set; }
}