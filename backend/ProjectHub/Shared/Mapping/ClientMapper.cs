using ProjectHub.Core.Entities;
using ProjectHub.Shared.DTOs;

namespace ProjectHub.Shared.Mapping
{
    public static class ClientMapper
    {
        public static ClientDto ToDto(Client client)
        {
            return new ClientDto
            {
                Id = client.Id,
                Name = client.Name,
                ProjectCount = client.Projects?.Count ?? 0
            };
        }
    }
}
