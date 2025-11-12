using Microsoft.AspNetCore.Mvc;
using ProjectHub.Services;
using ProjectHub.Shared.DTOs;

namespace ProjectHub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly ProjectService _projectService;

        public ProjectsController(ProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpPost]
        public async Task<ActionResult<ProjectDto>> Create(ProjectCreateDto dto)
        {
            var project = await _projectService.CreateProjectAsync(dto);

            if (project == null)
            {
                return BadRequest(new { message = "Failed to create project." });
            }

            return Ok(project);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> GetById(int id)
        {
            var project = await _projectService.GetProjectByIdAsync(id);

            if(project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        [HttpGet]
        public async Task<ActionResult<List<ProjectDto>>> GetAll()
        {
            var projects = _projectService.GetAllProjectsAsync();

            return Ok(projects);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProjectDto>> Update(int id, ProjectUpdateDto dto)
        {
            var updatedProject = await _projectService.UpdateProjectAsync(id, dto);

            if (updatedProject == null)
            {
                return NotFound();
            }

            return Ok(updatedProject);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _projectService.DeleteProjectAsync(id);

            if(!deleted)
            {
                return NotFound();
            }

            return Ok(deleted);
        }

        [HttpGet("paged")]
        public async Task<IActionResult> GetProjectsPaged([FromQuery] ProjectQueryDto query)
        {
            var (projects, totalCount) = await _projectService.GetProjectsPagedAsync(query);

            var pagedResults = new PagedResult<ProjectDto>
            {
                TotalCount = totalCount,
                PageNumber = query.PageNumber,
                PageSize = query.PageSize,
                Items = projects,
            };

            return Ok(pagedResults);
        }
    }
}
