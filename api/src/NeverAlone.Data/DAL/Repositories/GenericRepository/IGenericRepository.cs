using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NeverAlone.Data.Models;

namespace NeverAlone.Data.DAL.Repositories.GenericRepository;

public interface IGenericRepository<T> where T : Auditable
{
    Task<IEnumerable<T>> GetAllAsync();

    Task<T> GetByIdAsync(Guid obj);

    Task InsertAsync(T obj);

    Task UpdateAsync(T obj);

    Task DeleteAsync(object id);
}