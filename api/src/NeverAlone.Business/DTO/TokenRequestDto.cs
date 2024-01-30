using System.ComponentModel.DataAnnotations;

namespace NeverAlone.Business.DTO;

public class TokenRequestDto
{
    [Required] public string Token { get; set; } = "";

    [Required] public string RefreshToken { get; set; } = "";
}