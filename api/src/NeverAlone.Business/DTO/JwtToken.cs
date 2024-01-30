namespace NeverAlone.Business.DTO;

public class JwtToken
{
    public string Token { get; set; } = "";

    public string RefreshToken { get; set; } = "";

    public DateTime ExpiryDate { get; set; } = DateTime.Now;
}