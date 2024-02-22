using System.Threading.Tasks;
using NeverAlone.Business.DTO;
using NeverAlone.Data.Models;

namespace NeverAlone.Web.Services.Token;

public interface ITokenService
{
    public Task<JwtToken> GenerateJwtToken(ApplicationUser user);

    public Task<JwtToken> VerifyTokenRequest(TokenRequestDto tokenRequest);
}