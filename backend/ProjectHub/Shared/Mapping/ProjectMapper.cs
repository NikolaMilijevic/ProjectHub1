using ProjectHub.Core.Entities;
using ProjectHub.Shared.DTOs;

namespace ProjectHub.Services.Mappers
{
    public static class ProjectMapper
    {
        public static ProjectDto ToDto(Project project)
        {
            return new ProjectDto
            {
                Id = project.Id,
                Title = project.Title,
                Description = project.Description,
                Budget = project.Budget,
                StartDate = project.StartDate.ToDateTime(TimeOnly.MinValue),
                DueDate = project.DueDate.ToDateTime(TimeOnly.MinValue),
                InitialStatus = project.InitialStatus,
                PriorityLevel = project.PriorityLevel,
                ClientName = project.Client?.Name ?? "",
                CreatedAt = project.CreatedAt.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                UpdatedAt = (project.ModifiedAt ?? project.CreatedAt).ToString("yyyy-MM-ddTHH:mm:ssZ"),
                Progress = project.Progress
            };
        }
    }
}
