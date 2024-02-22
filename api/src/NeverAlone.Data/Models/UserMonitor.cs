using System;

namespace NeverAlone.Data.Models;

public sealed class UserMonitor : Auditable
{
    private readonly DateTime _serverTime = DateTime.UtcNow;
    
    public DateTime CreatedAt { get; set; }
    
    public bool IsNotifiedFifteenMinutes { get; set; } = false;

    public DateTime TimeWillTrigger { get; set; }

    public bool IsTriggered { get; set; } = false;

    public bool IsManuallyTriggered { get; set; } = false;

    public DateTime TimeManuallyTriggered { get; set; } = DateTime.MinValue;

    public bool HasTriggered => _serverTime > TimeWillTrigger;
    public string ApplicationUserId { get; set; }

    public ApplicationUser ApplicationUser { get; set; }
}