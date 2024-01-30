using System;

namespace NeverAlone.Data.Models;

public sealed class UserMonitor : Auditable
{
    public DateTime CreatedAt { get; set; }

    public DateTime TimeWillTrigger { get; set; }

    public bool IsTriggered { get; set; } = false;
    public string ApplicationUserId { get; set; }

    public ApplicationUser ApplicationUser { get; set; }
}