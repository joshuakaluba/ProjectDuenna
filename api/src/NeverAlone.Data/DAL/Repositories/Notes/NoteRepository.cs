using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NeverAlone.Data.DAL.Repositories.GenericRepository;
using NeverAlone.Data.DataContext;
using NeverAlone.Data.Models;

namespace NeverAlone.Data.DAL.Repositories.Notes;

public class NoteRepository : BaseGenericRepository<Note>, INoteRepository
{
    private readonly ApplicationDbContext _context;

    public NoteRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Note>> GetNoteByMonitorIdAsync(Guid monitorId)
    {
        var notes
            = await _context.Notes.Where(m => m.UserMonitorId == monitorId)
                .OrderByDescending(d => d.DateCreated)
                .ToListAsync();

        return notes;
    }
}