using ProjectHub.Shared.DTOs;

namespace ProjectHub.Core.Interfaces
{
    public interface IClientService
    {
        Task<List<ClientDto>> GetAllClientsAsync();
        Task<ClientDto?> GetClientByIdAsync(int id);
        Task<bool> DeleteClientByIdAsync(int id);
    }
}
