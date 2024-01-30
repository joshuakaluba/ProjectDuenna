using System;
using Microsoft.AspNetCore.Identity;

namespace NeverAlone.Data.Models;

public class ApplicationUser : IdentityUser
{
    public bool Active { get; set; } = true;

    public DateTime DateCreated { get; set; } = DateTime.UtcNow;
}