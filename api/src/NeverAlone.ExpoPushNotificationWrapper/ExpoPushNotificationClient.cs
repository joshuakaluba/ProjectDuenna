using System.Net.Http.Headers;
using System.Text;
using NeverAlone.Business.Services.Notifications;
using Newtonsoft.Json;

namespace NeverAlone.ExpoPushNotificationWrapper;

public class ExpoPushNotificationClient : ISendPushNotification
{
    public async Task SendPushNotification(List<string> tokens, string title, string message)
    {
        var pushData = new
        {
            to = tokens,
            title = title,
            body = message
        };

        var json = JsonConvert.SerializeObject(pushData);
        using var httpClient = new HttpClient();

        httpClient.BaseAddress = new Uri("https://exp.host");
        httpClient.DefaultRequestHeaders.Accept.Clear();
        httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await httpClient.PostAsync("/--/api/v2/push/send", content);
        if (response.IsSuccessStatusCode)
        {
            // Handle success
            var responseContent = await response.Content.ReadAsStringAsync();
            Console.WriteLine("Push notification sent successfully: " + responseContent);
        }
        else
        {
            // Handle failure
            Console.WriteLine("Failed to send push notification. Status code: " + response.StatusCode);
        }
    }
}