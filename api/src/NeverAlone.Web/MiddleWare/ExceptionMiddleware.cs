using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using NeverAlone.Web.Models;
using Newtonsoft.Json;

namespace NeverAlone.Web.MiddleWare;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    //private readonly ILoggerManager _logger;

    public ExceptionMiddleware(RequestDelegate next
        //, ILoggerManager logger
    )
    {
        //_logger = logger;
        _next = next;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch (Exception ex)
        {
            //_logger.LogError($"Something went wrong: {ex}");
            await HandleExceptionAsync(httpContext, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var message = exception switch
        {
            AccessViolationException => "Access violation error from the custom middleware",
            _ => $"Internal Server Error: {exception.Message}"
        };

        var errorDetails = new ErrorDetails
        {
            StatusCode = context.Response.StatusCode,
            Message = message
        };

        await context.Response.WriteAsync(JsonConvert.SerializeObject(errorDetails));
    }
}