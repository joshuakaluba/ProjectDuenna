using Microsoft.AspNetCore.Builder;
using NeverAlone.Web.MiddleWare;

namespace NeverAlone.Web.Extensions;

public static class ExceptionMiddlewareExtensions
{
    public static void ConfigureCustomExceptionMiddleware(this IApplicationBuilder app)
    {
        app.UseMiddleware<ExceptionMiddleware>();
    }
}