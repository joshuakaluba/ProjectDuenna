using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NeverAlone.Business.DTO;
using NeverAlone.Business.Services.Users;
using NeverAlone.Data.Models;
using NeverAlone.Web.Services;

namespace NeverAlone.Web.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly ITokenService _tokenService;
    private readonly IUserService _userService;

    public AuthenticationController(
        IUserService userService,
        ITokenService tokenService)
    {
        _tokenService = tokenService;
        _userService = userService;
    }

    [HttpPost]
    [Route("Register")]
    public async Task<IActionResult> Register([FromBody] UserRegistrationDto user)
    {
        if (!ModelState.IsValid) return BadRequest(new ResponseMessage("Invalid payload"));

        var existingUser = await _userService.FindUserByEmailAsync(user.Email);
        if (existingUser != null) return BadRequest(new ResponseMessage("Email already in use"));

        var newUser = new ApplicationUser
        {
            Email = user.Email,
            UserName = user.Email
        };

        var isCreated = await _userService.CreateUserAsync(newUser, user.Password);
        if (!isCreated.Succeeded)
            return BadRequest(new ResponseMessage(isCreated.Errors.Select(x => x.Description).FirstOrDefault()));
        var jwtToken = await _tokenService.GenerateJwtToken(newUser);
        return Ok(jwtToken);
    }

    [HttpPost]
    [Route("Login")]
    public async Task<IActionResult> Login([FromBody] UserLoginRequestDto user)
    {
        if (!ModelState.IsValid) return BadRequest(new ResponseMessage("Invalid payload"));

        var existingUser = await _userService.FindUserByEmailAsync(user.Email);
        if (existingUser == null || !existingUser.Active) return BadRequest(new ResponseMessage("Unable to login"));

        var isCorrect = await _userService.CheckPasswordAsync(existingUser, user.Password);
        if (!isCorrect) return BadRequest(new ResponseMessage("Unable to login"));

        var jwtToken = await _tokenService.GenerateJwtToken(existingUser);
        return Ok(jwtToken);
    }

    [HttpPost]
    [Route("DeleteMyAccount")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> DeleteMyAccount([FromBody] UserDeleteRequestDto userDeleteRequestDto)
    {
        if (!ModelState.IsValid) return BadRequest(new ResponseMessage("Invalid payload"));

        var existingUser = await GetCurrentAuthenticatedUserAsync();
        if (existingUser == null || !existingUser.Active) return BadRequest(new ResponseMessage("Unable to delete"));

        var isCorrect = await _userService.CheckPasswordAsync(existingUser, userDeleteRequestDto.Password);
        if (!isCorrect) return BadRequest(new ResponseMessage("Unable to delete."));

        await _userService.DeactivateUserAsync(existingUser);
        return Ok(new ResponseMessage("Successfully deleted"));
    }

    [HttpPost]
    [Route("RefreshToken")]
    public async Task<IActionResult> RefreshToken([FromBody] TokenRequestDto tokenRequest)
    {
        if (!ModelState.IsValid) return BadRequest(new ResponseMessage("Invalid payload"));

        var result = await _tokenService.VerifyTokenRequest(tokenRequest);
        if (result == null) return BadRequest(new ResponseMessage("Invalid token"));

        return Ok(result);
    }

    private async Task<ApplicationUser> GetCurrentAuthenticatedUserAsync()
    {
        var email = User?.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _userService.FindUserByEmailAsync(email);
        if (user == null) throw new NullReferenceException("Unable to retrieve active user");

        return user;
    }
}