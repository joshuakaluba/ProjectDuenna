#nullable enable
using Newtonsoft.Json;

namespace NeverAlone.Web.Models;

public class ErrorDetails
{
    [JsonProperty("statusCode")] public int? StatusCode { get; set; }

    [JsonProperty("message")] public string? Message { get; set; }

    public override string ToString()
    {
        return Message!;
    }
}