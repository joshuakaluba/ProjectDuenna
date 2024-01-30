using System;
using Newtonsoft.Json;

namespace NeverAlone.Data.Models;

public class ResponseMessage
{
    public ResponseMessage(string message)
    {
        Message = message;
    }

    public ResponseMessage(Exception exception)
    {
        Message = exception.Message;
    }

    [JsonProperty("message")] public string Message { get; set; }
}