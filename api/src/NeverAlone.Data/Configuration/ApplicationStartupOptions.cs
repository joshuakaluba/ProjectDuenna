using System;

namespace NeverAlone.Data.Configuration;

public static class ApplicationStartupOptions
{
    public static readonly string DatabaseHost
        = Environment.GetEnvironmentVariable
            ("NEVER_ALONE_DB_HOST", EnvironmentVariableTarget.Process);

    public static readonly string Port
        = Environment.GetEnvironmentVariable
            ("NEVER_ALONE_PORT", EnvironmentVariableTarget.Process);

    internal static readonly string DatabaseName
        = Environment.GetEnvironmentVariable
            ("NEVER_ALONE_DB_NAME", EnvironmentVariableTarget.Process);

    internal static readonly string DatabaseUser
        = Environment.GetEnvironmentVariable
            ("NEVER_ALONE_DB_USER", EnvironmentVariableTarget.Process);

    public static readonly string RedisHost
        = Environment.GetEnvironmentVariable
            ("NEVER_ALONE_REDIS_HOST", EnvironmentVariableTarget.Process);

    public static readonly string RedisPassword
        = Environment.GetEnvironmentVariable
            ("NEVER_ALONE_REDIS_PASSWORD", EnvironmentVariableTarget.Process);

    internal static readonly string DatabasePassword
        = Environment.GetEnvironmentVariable
            ("NEVER_ALONE_DB_PASSWORD", EnvironmentVariableTarget.Process);
}