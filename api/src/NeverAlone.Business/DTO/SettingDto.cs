namespace NeverAlone.Business.DTO;

public class SettingDto
{
    public Guid Id { get; set; }
    public int DefaultMonitorTime { get; set; }

    public int DefaultMonitorTimeRemainingReminder { get; set; }

    public string? ApplicationUserId { get; set; }
}