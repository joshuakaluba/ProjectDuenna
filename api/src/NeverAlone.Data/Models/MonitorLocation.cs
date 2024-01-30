using System;

namespace NeverAlone.Data.Models;

public sealed class MonitorLocation : Auditable
{
    public double Latitude { get; set; }

    public double Longitude { get; set; }

    public Guid UserMonitorId { get; set; }

    public UserMonitor UserMonitor { get; set; }
}