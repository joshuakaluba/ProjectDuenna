using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace NeverAlone.Data.Models;

public class ApplicationUser : IdentityUser
{
    public bool Active { get; set; } = true;

    public DateTime DateCreated { get; set; } = DateTime.UtcNow;

    public IEnumerable<ExpoPushNotificationToken> ExpoPushNotificationTokens { get; set; } =
        new List<ExpoPushNotificationToken>();

    public IEnumerable<Contact> Contacts { get; set; } =
        new List<Contact>();
}