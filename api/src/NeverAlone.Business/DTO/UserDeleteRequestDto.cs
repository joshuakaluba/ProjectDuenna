using System.ComponentModel.DataAnnotations;

namespace NeverAlone.Business.DTO;

public class UserDeleteRequestDto
{
    [Required] public string Password { get; set; } = "";
}