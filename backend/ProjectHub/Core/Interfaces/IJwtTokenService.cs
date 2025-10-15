using ProjectHub.Core.Entities;
using ProjectHub.Shared.DTOs;

namespace ProjectHub.Core.Interfaces
{
    public interface IJwtTokenService
    {
        AuthResponseDto GenerateToken(User user);
    }
}
