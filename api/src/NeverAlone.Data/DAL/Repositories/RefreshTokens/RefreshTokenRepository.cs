using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NeverAlone.Data.DataContext;
using NeverAlone.Data.Models;

namespace NeverAlone.Data.DAL.Repositories.RefreshTokens;

public sealed class RefreshTokenRepository : IRefreshTokenRepository
{
    private readonly ApplicationDbContext _applicationDbContext;

    public RefreshTokenRepository(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task SaveRefreshToken(RefreshToken refreshToken)
    {
        await _applicationDbContext.RefreshTokens.AddAsync(refreshToken);
        await _applicationDbContext.SaveChangesAsync();
    }

    public async Task<RefreshToken> FindRefreshToken(string tokenToFind)
    {
        var token
            = await _applicationDbContext.RefreshTokens.FirstOrDefaultAsync
                (x => x.Token == tokenToFind);

        return token;
    }

    public async Task UpdateRefreshToken(RefreshToken refreshToken)
    {
        _applicationDbContext.RefreshTokens.Update(refreshToken);
        await _applicationDbContext.SaveChangesAsync();
    }
}