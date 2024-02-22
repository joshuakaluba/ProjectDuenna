using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using NeverAlone.Business.DTO;
using NeverAlone.Data.DAL.Repositories.RefreshTokens;
using NeverAlone.Data.Exceptions;
using NeverAlone.Data.Models;
using NeverAlone.Data.Utilities;
using NeverAlone.Web.Configuration;

namespace NeverAlone.Web.Services.Token;

public class TokenService : ITokenService
{
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly TokenValidationParameters _tokenValidationParams;
    private readonly UserManager<ApplicationUser> _userManager;

    public TokenService(
        UserManager<ApplicationUser> userManager,
        IRefreshTokenRepository refreshTokenRepository,
        TokenValidationParameters tokenValidationParams)
    {
        _refreshTokenRepository = refreshTokenRepository;
        _userManager = userManager;
        _tokenValidationParams = tokenValidationParams;
    }

    public async Task<JwtToken> GenerateJwtToken(ApplicationUser user)
    {
        var jwtTokenHandler = new JwtSecurityTokenHandler();

        var key = Environment.GetEnvironmentVariable("NEVER_ALONE_JWTSecret", EnvironmentVariableTarget.Process);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("Id", user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            }),
            Expires = DateTime.UtcNow.AddDays(RefreshTokenOptions.TokenExpiryDays),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = jwtTokenHandler.CreateToken(tokenDescriptor);
        var jwtToken = jwtTokenHandler.WriteToken(token);
        var expiryDate = DateTime.UtcNow.AddMonths(RefreshTokenOptions.MonthsForTokenExpire);

        var refreshToken = new RefreshToken
        {
            JwtId = token.Id,
            IsUsed = false,
            IsRevoked = false,
            UserId = user.Id,
            DateCreated = DateTime.UtcNow,
            ExpiryDate = expiryDate,
            Token = StringUtilities.GenerateRandomString(35) + Guid.NewGuid()
        };

        await _refreshTokenRepository.SaveRefreshToken(refreshToken);

        return new JwtToken
        {
            Token = jwtToken,
            ExpiryDate = expiryDate,
            RefreshToken = refreshToken.Token
        };
    }

    public async Task<JwtToken> VerifyTokenRequest(TokenRequestDto tokenRequest)
    {
        var jwtTokenHandler = new JwtSecurityTokenHandler();

        try
        {
            // Validation 1 - Validation JWT token format
            var tokenInVerification =
                jwtTokenHandler.ValidateToken(tokenRequest.Token, _tokenValidationParams, out var validatedToken);

            // Validation 2 - Validate encryption alg
            if (validatedToken is JwtSecurityToken jwtSecurityToken)
            {
                var result = jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                    StringComparison.InvariantCultureIgnoreCase);

                if (result == false) return null;
            }

            // Validation 3 - validate expiry date
            var utcExpiryDate = long.Parse(tokenInVerification.Claims
                .FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp).Value);

            var expiryDate = DateTimeUtilities.UnixTimeStampToDateTime(utcExpiryDate);

            if (expiryDate > DateTime.UtcNow) throw new JwtTokenException("Token has not yet expired");

            // validation 4 - validate existence of the token
            var token = await _refreshTokenRepository.FindRefreshToken(tokenRequest.RefreshToken);

            if (token == null) throw new JwtTokenException("Token does not exist");

            // Validation 5 - validate if used
            if (token.IsUsed) throw new JwtTokenException("Token has been used");

            // Validation 6 - validate if revoked
            if (token.IsRevoked) throw new JwtTokenException("Token has been revoked");

            // Validation 7 - validate the id
            var jti = tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

            if (token.JwtId != jti) throw new JwtTokenException("Token does not match");

            // update current token

            token.IsUsed = true;

            await _refreshTokenRepository.UpdateRefreshToken(token);

            // Generate a new token
            var dbUser = await _userManager.FindByIdAsync(token.UserId);
            return await GenerateJwtToken(dbUser);
        }
        catch (Exception ex)
        {
            if (ex.Message.Contains("Lifetime validation failed. The token is expired."))
                throw new JwtTokenException("Token has expired");
            throw new JwtTokenException("Something went wrong");
        }
    }
}