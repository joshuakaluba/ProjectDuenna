using System.Diagnostics;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace NeverAlone.Business.Services.Caching;

public class CacheService : ICacheService
{
    private const string CachePreFix = "@NEVER_ALONE";
    private readonly IDistributedCache _cache;

    public CacheService(IDistributedCache cache)
    {
        _cache = cache;
    }

    public async Task<T?> GetAsync<T>(Guid key)
    {
        return await GetAsync<T>(key.ToString());
    }

    public async Task<T?> GetAsync<T>(string? key)
    {
        try
        {
            if (key == null) return default;

            var cacheId = GetPrefixedKey<T>(key);

            var value = await _cache.GetStringAsync(cacheId);

            if (value != null) return JsonConvert.DeserializeObject<T>(value);
        }
        catch (Exception ex)
        {
            // TODO log exception
            Debug.WriteLine(ex);
        }

        return default;
    }

    public async Task<T?> SetAsync<T>(Guid key, T? value)
    {
        return await SetAsync(key.ToString(), value);
    }

    public async Task<T?> SetAsync<T>(string? key, T? value)
    {
        try
        {
            if (key == null || value == null) return default;

            var cacheId = GetPrefixedKey<T>(key);

            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(72),
                SlidingExpiration = TimeSpan.FromHours(48)
            };

            var serializedObject = JsonConvert.SerializeObject(value);

            await _cache.SetStringAsync(cacheId, serializedObject, options);
        }
        catch (Exception ex)
        {
            // TODO log exception
            Debug.WriteLine(ex);
        }

        return value;
    }

    public async Task<T?> RemoveAsync<T>(Guid key)
    {
        return await RemoveAsync<T>(key.ToString());
    }

    public async Task<T?> RemoveAsync<T>(string? key)
    {
        try
        {
            if (key == null) return default;

            var cacheId = GetPrefixedKey<T>(key);

            await _cache.RemoveAsync(cacheId);
        }
        catch (Exception ex)
        {
            // TODO log exception
            Debug.WriteLine(ex);
        }

        return default;
    }

    private static string GetPrefixedKey<T>(string key)
    {
        return $"{CachePreFix}-{typeof(T).Name}-{key}".Replace("`", "");
    }
}