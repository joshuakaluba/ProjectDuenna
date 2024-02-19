namespace NeverAlone.Data.Models;

public sealed class Setting : Auditable
{
    public int DefaultMonitorTime { get; set; } = 120;

    public int DefaultMonitorTimeRemainingReminder { get; set; } = 15;

    public string ApplicationUserId { get; set; }

    public ApplicationUser ApplicationUser { get; set; }
}