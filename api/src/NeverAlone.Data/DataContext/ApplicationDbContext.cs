using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NeverAlone.Data.Configuration;
using NeverAlone.Data.Models;

namespace NeverAlone.Data.DataContext;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public virtual DbSet<Contact> Contacts { get; set; }
    public virtual DbSet<Note> Notes { get; set; }
    public virtual DbSet<UserMonitor> UserMonitors { get; set; }
    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

    public virtual DbSet<Setting> Settings { get; set; }

    public virtual DbSet<ExpoPushNotificationToken> ExpoPushNotificationTokens { get; set; }
    public virtual DbSet<MonitorLocation> MonitorLocations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Ensure we can't save the same token twice
        modelBuilder.Entity<ExpoPushNotificationToken>()
            .HasIndex(e => e.Token)
            .IsUnique();

        // Ensure we have one setting object per user
        modelBuilder.Entity<Setting>()
            .HasIndex(e => e.ApplicationUserId)
            .IsUnique();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySql(ApplicationStartupOptions.GetMySqlConnectionString(), ServerVersion.AutoDetect(
            ApplicationStartupOptions.GetMySqlConnectionString()));
    }
}