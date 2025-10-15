using ProjectHub.Core.Entities;
using ProjectHub.Shared.DTOs;

namespace ProjectHub.Core.Interfaces
{
    public interface IProjectService
    {
        Task<ProjectDto> CreateProjectAsync(ProjectCreateDto dto);
        Task<ProjectDto?> GetProjectByIdAsync(int id);
        Task<List<ProjectDto>> GetAllProjectsAsync();
        Task<ProjectDto?> UpdateProjectAsync(int id, ProjectUpdateDto? dto);
        Task<bool> DeleteProjectAsync(int id);
        Task<(List<ProjectDto> Projects, int TotalCount)> GetProjectsPagedAsync(ProjectQueryDto query);
    }
}
