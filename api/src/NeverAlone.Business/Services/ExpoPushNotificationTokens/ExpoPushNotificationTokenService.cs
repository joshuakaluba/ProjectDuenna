using AutoMapper;
using NeverAlone.Business.DTO;
using NeverAlone.Data.DAL.Repositories.ExpoPushNotificationTokens;
using NeverAlone.Data.Models;

namespace NeverAlone.Business.Services.ExpoPushNotificationTokens;

public class ExpoPushNotificationTokenService : IExpoPushNotificationTokenService
{
    private readonly IExpoPushNotificationTokenRepository _expoPushNotificationTokenRepository;
    private readonly IMapper _mapper;

    public ExpoPushNotificationTokenService(IMapper mapper,
        IExpoPushNotificationTokenRepository expoPushNotificationTokenRepository)
    {
        _mapper = mapper;
        _expoPushNotificationTokenRepository = expoPushNotificationTokenRepository;
    }

    public async Task CreateExpoPushNotificationTokenAsync(ExpoPushNotificationTokenDto expoPushNotificationToken)
    {
        var token = _mapper.Map<ExpoPushNotificationTokenDto, ExpoPushNotificationToken>(expoPushNotificationToken);
        await _expoPushNotificationTokenRepository.InsertAsync(token);
    }
}