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

        private ActionResult<T> Wrap<T>(T? entity) => entity == null ? NotFound() : Ok(entity);

        [HttpPost]
        public async Task<ActionResult<ProjectDto>> Create(ProjectCreateDto dto)
        {
            var project = await _projectService.CreateProjectAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = project.Id }, project);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> GetById(int id)
        {
            return Wrap(await _projectService.GetProjectByIdAsync(id));
        }

        [HttpGet]
        public async Task<ActionResult<List<ProjectDto>>> GetAll()
        {
            return Ok(await _projectService.GetAllProjectsAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProjectDto>> Update(int id, ProjectUpdateDto dto)
        {
            return Wrap(await _projectService.UpdateProjectAsync(id, dto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return await _projectService.DeleteProjectAsync(id) ? NoContent() : NotFound();
        }

        [HttpGet("paged")]
        public async Task<IActionResult> GetProjectsPaged([FromQuery] ProjectQueryDto query)
        {
            var (projects, totalCount) = await _projectService.GetProjectsPagedAsync(query);

            return Ok(new PagedResult<ProjectDto>
            {
                TotalCount = totalCount,
                PageNumber = query.PageNumber,
                PageSize = query.PageSize,
                Items = projects,
            });
        }
    }
}
