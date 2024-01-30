using NeverAlone.Data.DAL.Repositories.GenericRepository;
using NeverAlone.Data.DataContext;
using NeverAlone.Data.Models;

namespace NeverAlone.Data.DAL.Repositories.ExpoPushNotificationTokens;

public class ExpoPushNotificationTokenRepository : BaseGenericRepository<ExpoPushNotificationToken>, IExpoPushNotificationTokenRepository
{
    public ExpoPushNotificationTokenRepository(ApplicationDbContext context) 
        : base(context)
    {
    }
}