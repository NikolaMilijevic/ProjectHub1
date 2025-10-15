using Microsoft.AspNetCore.Mvc;
using ProjectHub.Services.Auth;
using ProjectHub.Shared.DTOs;

namespace ProjectHub.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            return (await _authService.RegisterAsync(dto)) is { } result
                ? Ok(result)
                : BadRequest(new { message = "Email already  exists" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            return (await _authService.LoginAsync(dto)) is { } result
            ? Ok(result)
            : Unauthorized(new { message = "Invalid credentials " });
        }
    }
}