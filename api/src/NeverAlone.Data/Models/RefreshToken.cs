using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeverAlone.Data.Models;

public class RefreshToken
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string UserId { get; set; }
    public string Token { get; set; }
    public string JwtId { get; set; }
    public bool IsUsed { get; set; }
    public bool IsRevoked { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime ExpiryDate { get; set; }

    [ForeignKey(nameof(UserId))] public ApplicationUser User { get; set; }
}