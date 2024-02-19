using NeverAlone.Business.DTO;

namespace NeverAlone.Business.Services.Notes;

public interface INoteService
{
    Task CreateNoteAsync(NoteDto noteDto);

    Task<IEnumerable<NoteDto>?> GetNoteByMonitorAsync(Guid monitorId);
}