using System.Threading.Tasks;
using NeverAlone.Data.Models;

namespace NeverAlone.Data.DAL.Repositories.RefreshTokens;

public interface IRefreshTokenRepository
{
    public Task SaveRefreshToken(RefreshToken refreshToken);

    public Task UpdateRefreshToken(RefreshToken refreshToken);

    public Task<RefreshToken> FindRefreshToken(string tokenToFind);
}