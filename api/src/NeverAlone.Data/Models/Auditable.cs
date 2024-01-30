using System;
using Newtonsoft.Json;

namespace NeverAlone.Data.Models;

public abstract class Auditable : IEquatable<Auditable>
{
    [JsonProperty("id")] public Guid Id { get; set; } = Guid.NewGuid();

    [JsonProperty("dateCreated")] public virtual DateTime DateCreated { get; set; } = DateTime.UtcNow;

    [JsonProperty("active")] public virtual bool Active { get; set; } = true;

    public virtual bool Equals(Auditable other)
    {
        if (other == null) return false;

        return Id == other.Id;
    }
}