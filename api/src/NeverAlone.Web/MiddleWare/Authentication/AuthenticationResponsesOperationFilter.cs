using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace NeverAlone.Web.MiddleWare.Authentication;

internal sealed class AuthenticationResponsesOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        var attributes = context.MethodInfo.DeclaringType.GetCustomAttributes(true)
            .Union(context.MethodInfo.GetCustomAttributes(true));

        if (attributes.OfType<IAllowAnonymous>().Any()) return;

        var authAttributes = attributes.OfType<IAuthorizeData>();

        if (authAttributes.Any())
        {
            operation.Responses["401"] = new OpenApiResponse { Description = "Unauthorized" };

            if (authAttributes.Any(att =>
                    !string.IsNullOrWhiteSpace(att.Roles) || !string.IsNullOrWhiteSpace(att.Policy)))
                operation.Responses["403"] = new OpenApiResponse { Description = "Forbidden" };

            operation.Security = new List<OpenApiSecurityRequirement>
            {
                new()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Id = "BearerAuth",
                                Type = ReferenceType.SecurityScheme
                            }
                        },
                        Array.Empty<string>()
                    }
                }
            };
        }
    }
}