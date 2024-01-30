using System;

namespace NeverAlone.Data.Models;

public class Note : Auditable
{
    public string TextContext { get; set; }
    public Guid UserMonitorId { get; set; }
    public UserMonitor UserMonitor { get; set; }
}