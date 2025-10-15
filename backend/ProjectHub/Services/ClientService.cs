using Microsoft.EntityFrameworkCore;
using ProjectHub.Core.Interfaces;
using ProjectHub.Data;
using ProjectHub.Shared.DTOs;

namespace ProjectHub.Services
{
    public class ClientService : IClientService
    {
        private readonly AppDbContext _db;

        public ClientService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<List<ClientDto>> GetAllClientsAsync()
        {
            return await _db.Clients
                .Select(c => new ClientDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    ProjectCount = c.Projects.Count(),
                })
                .ToListAsync();
        }

        public async Task<ClientDto?> GetClientByIdAsync(int id)
        {
            return await _db.Clients
                .Where(c => c.Id == id)
                .Select(c => new ClientDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    ProjectCount = c.Projects.Count(),
                })
                .FirstOrDefaultAsync();
        }

        public async Task<bool> DeleteClientByIdAsync(int id)
        {
            var deleted = await _db.Clients
                .Where(c => c.Id == id)
                .ExecuteDeleteAsync();

            return deleted > 0;
        }
    }
}
