using System.ComponentModel.DataAnnotations;

namespace NeverAlone.Business.DTO;

public class UserLoginRequestDto
{
    [Required] [EmailAddress] public string Email { get; set; } = "";

    [Required] public string Password { get; set; } = "";
}