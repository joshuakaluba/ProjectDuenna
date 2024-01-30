using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NeverAlone.Data.DAL.Repositories.GenericRepository;
using NeverAlone.Data.Models;

namespace NeverAlone.Data.DAL.Repositories.Notes;

public interface INoteRepository : IGenericRepository<Note>
{
    Task<IEnumerable<Note>> GetNoteByMonitorIdAsync(Guid monitorId);
}