namespace NeverAlone.Business.DTO;

public class UserMonitorDto
{
    private readonly DateTime _serverTime = DateTime.UtcNow;
    public Guid? Id { get; set; } = Guid.NewGuid();

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    

    public DateTime TimeWillTrigger { get; set; }

    public double ProgressPercent
    {
        get
        {
            var numerator = TimeWillTrigger.Subtract(_serverTime);
            var denominator = TimeWillTrigger.Subtract(CreatedAt);
            var result = numerator.TotalMinutes / denominator.TotalMinutes;
            result *= 100;
            if (result <= 0) return 100;

            return result;
        }
    }

    public string TimeRemaining
    {
        get
        {
            var result = TimeWillTrigger.Subtract(_serverTime);
            return result < TimeSpan.Zero ? "00:00:00" : result.ToString(@"hh\:mm");
        }
    }

    public int MinutesToAdd { get; set; }

    public bool Active { get; set; }

    public bool IsTriggered { get; set; } = false;

    public bool HasTriggered => _serverTime > TimeWillTrigger;

    public string? ApplicationUserId { get; set; }
}