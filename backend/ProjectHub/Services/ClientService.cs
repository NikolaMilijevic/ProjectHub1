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
                .Select(c => new ClientDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    ProjectCount = c.Projects.Count(),
                })
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<bool> DeleteClientByIdAsync(int id)
        {
            var client = await _db.Clients.FindAsync(id);
            if (client == null)
                return false;

            _db.Clients.Remove(client);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
