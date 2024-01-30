namespace NeverAlone.Business.Services.Caching;

public interface ICacheService
{
    Task<T?> GetAsync<T>(Guid key);

    Task<T?> GetAsync<T>(string key);

    Task<T?> SetAsync<T>(Guid key, T? value);

    Task<T?> SetAsync<T>(string key, T? value);

    Task<T?> RemoveAsync<T>(Guid key);

    Task<T?> RemoveAsync<T>(string key);
}