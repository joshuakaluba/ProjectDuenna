using AutoMapper;
using NeverAlone.Business.DTO;
using NeverAlone.Data.DAL.Repositories.Notes;
using NeverAlone.Data.Models;

namespace NeverAlone.Business.Services.Notes;

public class NoteService : INoteService
{
    private readonly IMapper _mapper;
    private readonly INoteRepository _noteRepository;

    public NoteService(IMapper mapper,
        INoteRepository noteRepository)
    {
        _mapper = mapper;
        _noteRepository = noteRepository;
    }

    public async Task CreateNoteAsync(NoteDto noteDto)
    {
        var location = _mapper.Map<NoteDto, Note>(noteDto);
        await _noteRepository.InsertAsync(location);
    }

    public async Task<IEnumerable<NoteDto>?> GetNoteByMonitorAsync(Guid monitorId)
    {
        var notes = await _noteRepository.GetNoteByMonitorIdAsync(monitorId);
        var notesDto = _mapper.Map<IEnumerable<Note>, IEnumerable<NoteDto>>(notes);

        return notesDto;
    }
}