using AutoMapper;
using NeverAlone.Business.DTO;
using NeverAlone.Data.Models;

namespace NeverAlone.Business.Mapping;

public class NeverAloneProfile : Profile
{
    public NeverAloneProfile()
    {
        CreateMap<ContactDto, Contact>().ReverseMap();
        CreateMap<UserMonitorDto, UserMonitor>().ReverseMap();
        CreateMap<MonitorLocationDto, MonitorLocation>().ReverseMap();
        CreateMap<NoteDto, Note>().ReverseMap();
        CreateMap<ExpoPushNotificationTokenDto, ExpoPushNotificationToken>().ReverseMap();
        CreateMap<SettingDto, Setting>().ReverseMap();
    }
}