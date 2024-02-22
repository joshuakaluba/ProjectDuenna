using System;

namespace NeverAlone.Data.Configuration;

public static class ApplicationStartupOptions
{
    private static readonly string DatabaseHost
        = Environment.GetEnvironmentVariable
            ("NEVER_ALONE_DB_HOST", EnvironmentVariableTarget.Process);

    private static readonly string DatabaseName
        = Environment.GetEnvironmentVariable
            ("NEVER_ALONE_DB_NAME", EnvironmentVariableTarget.Process);

    private static readonly string DatabaseUser
        = Environment.GetEnvironmentVariable
            ("NEVER_ALONE_DB_USER", EnvironmentVariableTarget.Process);

    private static readonly string DatabasePassword
        = Environment.GetEnvironmentVariable
            ("NEVER_ALONE_DB_PASSWORD", EnvironmentVariableTarget.Process);

    public static readonly string Port
        = Environment.GetEnvironmentVariable
            ("NEVER_ALONE_PORT", EnvironmentVariableTarget.Process);
    
    public static readonly string RedisHost
        = Environment.GetEnvironmentVariable
            ("NEVER_ALONE_REDIS_HOST", EnvironmentVariableTarget.Process);

    public static readonly string RedisPassword
        = Environment.GetEnvironmentVariable
            ("NEVER_ALONE_REDIS_PASSWORD", EnvironmentVariableTarget.Process);

    public static readonly string JwtSecret
        = Environment.GetEnvironmentVariable
            ("NEVER_ALONE_JWTSecret", EnvironmentVariableTarget.Process);

    public static string GetMySqlConnectionString()
    {
        var connectionString = $"Server={DatabaseHost};" +
                               $"database={DatabaseName};" +
                               $"uid={DatabaseUser};" +
                               $"pwd={DatabasePassword};" +
                               "pooling=true;";
        return connectionString;
    }
}