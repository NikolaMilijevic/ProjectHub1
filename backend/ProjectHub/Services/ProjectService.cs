using Microsoft.EntityFrameworkCore;
using ProjectHub.Core.Entities;
using ProjectHub.Core.Interfaces;
using ProjectHub.Data;
using ProjectHub.Services.Mappers;
using ProjectHub.Shared.DTOs;

namespace ProjectHub.Services
{
    public class ProjectService : IProjectService
    {
        private readonly AppDbContext _db;

        public ProjectService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<ProjectDto> CreateProjectAsync(ProjectCreateDto dto)
        {
                var client = await GetOrCreateClientsAsync(dto.ClientName);

                var project = new Project
                {
                    Title = dto.Title,
                    Description = dto.Description,
                    Budget = dto.Budget,
                    StartDate = DateOnly.FromDateTime(dto.StartDate),
                    DueDate = DateOnly.FromDateTime(dto.DueDate),
                    InitialStatus = dto.InitialStatus,
                    PriorityLevel = dto.PriorityLevel,
                    Progress = dto.Progress,
                    ClientId = client.Id,
                };

                _db.Projects.Add(project);
                await _db.SaveChangesAsync();

                return ProjectMapper.ToDto(project);
        }

        public async Task<ProjectDto?> GetProjectByIdAsync(int id)
        {
            return await _db.Projects
                .AsNoTracking()
                .Select(p => new ProjectDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    Description = p.Description,
                    Budget = p.Budget,
                    StartDate = p.StartDate.ToDateTime(TimeOnly.MinValue),
                    DueDate = p.DueDate.ToDateTime(TimeOnly.MinValue),
                    InitialStatus = p.InitialStatus,
                    PriorityLevel = p.PriorityLevel,
                    Progress = p.Progress,
                    ClientName = p.Client.Name,
                    CreatedAt = p.CreatedAt.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                    UpdatedAt = (p.ModifiedAt ?? p.CreatedAt).ToString("yyyy-MM-ddTHH:mm:ssZ"),
                })
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<ProjectDto>> GetAllProjectsAsync()
        {
            return await _db.Projects
                .AsNoTracking()
                .Select(p => new ProjectDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    Description = p.Description,
                    Budget = p.Budget,
                    StartDate = p.StartDate.ToDateTime(TimeOnly.MinValue),
                    DueDate = p.DueDate.ToDateTime(TimeOnly.MinValue),
                    InitialStatus = p.InitialStatus,
                    PriorityLevel = p.PriorityLevel,
                    Progress = p.Progress,
                    ClientName = p.Client.Name,
                    CreatedAt = p.CreatedAt.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                    UpdatedAt = (p.ModifiedAt ?? p.CreatedAt).ToString("yyyy-MM-ddTHH:mm:ssZ"),
                })
                .ToListAsync();
        }

        public async Task<ProjectDto?> UpdateProjectAsync(int id, ProjectUpdateDto dto)
        {
            var project = await _db.Projects.FindAsync(id);
            if (project == null)
            {
                return null;
            }

            var client = await GetOrCreateClientsAsync(dto.ClientName);

            project.Title = dto.Title;
            project.Description = dto.Description;
            project.Budget = dto.Budget;
            project.StartDate = DateOnly.FromDateTime(dto.StartDate);
            project.DueDate = DateOnly.FromDateTime(dto.DueDate);
            project.InitialStatus = dto.InitialStatus;
            project.PriorityLevel = dto.PriorityLevel;
            project.Progress = dto.Progress;
            project.ClientId = client.Id;

            await _db.SaveChangesAsync();

            return ProjectMapper.ToDto(project);
        }

        public async Task<bool> DeleteProjectAsync(int id)
        {
            var project = await _db.Projects.FindAsync(id);
            if (project == null) return false;

            _db.Projects.Remove(project);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<(List<ProjectDto> Projects, int TotalCount)> GetProjectsPagedAsync(ProjectQueryDto query)
        {
            var projectsQuery = _db.Projects
                .AsNoTracking()
                .Include(p => p.Client)
                .AsQueryable();

            if(!string.IsNullOrWhiteSpace(query.Search))
            {
                var lowerSearch = query.Search.ToLower();
                projectsQuery = projectsQuery.Where(p =>
                    p.Title.ToLower().Contains(lowerSearch) ||
                    p.Client.Name.ToLower().Contains(lowerSearch));
            }

            if(query.Priority.HasValue)
            {
                projectsQuery = projectsQuery.Where(p => p.PriorityLevel == query.Priority.Value);
            }

            if(query.InitialStatus.HasValue)
            {
                projectsQuery = projectsQuery.Where(p => p.InitialStatus == query.InitialStatus.Value);
            }

            bool ascending = string.Equals(query.SortOrder, "asc", StringComparison.OrdinalIgnoreCase);

            projectsQuery = query.SortBy?.ToLower() switch
            {
                "createdat" => ascending
                    ? projectsQuery.OrderBy(p => p.CreatedAt)
                    : projectsQuery.OrderByDescending(p => p.CreatedAt),

                "updatedat" => ascending
                    ? projectsQuery.OrderBy(p => p.ModifiedAt)
                    : projectsQuery.OrderByDescending(p => p.ModifiedAt),

                "title" => ascending
                    ? projectsQuery.OrderBy(p => p.Title)
                    : projectsQuery.OrderByDescending(p => p.Title),

                _ => projectsQuery.OrderByDescending(p => p.CreatedAt)
            };

            var totalCount = await projectsQuery.CountAsync();

            var projects = await projectsQuery
                .Skip((query.PageNumber - 1) * query.PageSize)
                .Take(query.PageSize)
                .Select(p => new ProjectDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    Description = p.Description,
                    Budget = p.Budget,
                    StartDate = p.StartDate.ToDateTime(TimeOnly.MinValue),
                    DueDate = p.DueDate.ToDateTime(TimeOnly.MinValue),
                    InitialStatus = p.InitialStatus,
                    PriorityLevel = p.PriorityLevel,
                    Progress = p.Progress,
                    ClientName = p.Client.Name,
                    CreatedAt = p.CreatedAt.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                    UpdatedAt = (p.ModifiedAt ?? p.CreatedAt).ToString("yyyy-MM-ddTHH:mm:ssZ"),
                })
                .ToListAsync();

            return (projects, totalCount);
        }

        private async Task<Client> GetOrCreateClientsAsync(string clientName)
        {
            var client = await _db.Clients
                .FirstOrDefaultAsync(c => c.Name.ToLower() == clientName.ToLower());

            if (client == null)
            {
                client = new Client { Name = clientName };
                _db.Clients.Add(client);
                await _db.SaveChangesAsync();
            }

            return client;
        }
    }
}