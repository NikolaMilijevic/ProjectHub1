using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectHub.Data;
using ProjectHub.Shared.DTOs;

namespace ProjectHub.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _db;

        public DashboardController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var totalUsers = await _db.Users.CountAsync();
            var totalProjects = await _db.Projects.CountAsync();

            var totalVisitors = 123;

            var stats = new DashboardStatsDto
            {
                TotalUsers = totalUsers,
                TotalProjects = totalProjects,
                TotalVisitors = totalVisitors
            };

            return Ok(stats);
        }
    }
}
