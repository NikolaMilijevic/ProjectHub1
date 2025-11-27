using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectHub.Core.Enums;
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

        [Authorize(Roles = nameof(Role.Admin))]
        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var totalUsers = await _db.Users.CountAsync();
            var totalProjects = await _db.Projects.CountAsync();

            var totalVisitors = 123;

            var users = await _db.Users
                .Select(u => new UserInfoDto
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    Role = u.Role.ToString(),
                })
                .ToListAsync();

            var stats = new DashboardStatsDto
            {
                TotalUsers = totalUsers,
                TotalProjects = totalProjects,
                TotalVisitors = totalVisitors,
                Users = users,
            };

            return Ok(stats);
        }
    }
}
