using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NeverAlone.Data.DataContext;
using NeverAlone.Data.Models;

namespace NeverAlone.Data.DAL.Repositories.GenericRepository;

public abstract class BaseGenericRepository<T> : IGenericRepository<T> where T : Auditable
{
    private readonly ApplicationDbContext _context;

    private readonly DbSet<T> _table;

    protected BaseGenericRepository(ApplicationDbContext context)
    {
        _context = context;
        _table = _context.Set<T>();
    }

    public virtual async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _table.ToListAsync();
    }

    public virtual async Task<T> GetByIdAsync(Guid obj)
    {
        return await _table.AsNoTracking().SingleOrDefaultAsync(o => o.Id == obj);
    }

    public virtual async Task InsertAsync(T obj)
    {
        _table.Add(obj);
        await _context.SaveChangesAsync();
    }

    public virtual async Task UpdateAsync(T obj)
    {
        _table.Attach(obj);
        _context.Entry(obj).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public virtual async Task DeleteAsync(object obj)
    {
        var existing = await _table.FindAsync(obj);
        if (existing != null)
        {
            _table.Remove(existing);
            await _context.SaveChangesAsync();
        }
    }
}