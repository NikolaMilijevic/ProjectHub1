using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProjectHub.Core.Entities;
using ProjectHub.Data;
using ProjectHub.Shared.DTOs;
using ProjectHub.Core.Interfaces;

namespace ProjectHub.Services.Auth
{
    public interface IAuthService
    {
        Task<AuthResult?> RegisterAsync(RegisterDto dto);
        Task<AuthResult?> LoginAsync(LoginDto dto);
    }
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IJwtTokenService _jwtService;

        public AuthService(AppDbContext context, IConfiguration config, IJwtTokenService jwtService)
        {
            _context = context;
            _config = config;
            _jwtService = jwtService;
            _passwordHasher = new PasswordHasher<User>();
        }

        public async Task<AuthResult?> RegisterAsync(RegisterDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            {
                return AuthResult.Fail("Email already in use");
            }

            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, dto.Password);

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return AuthResult.Ok(_jwtService.GenerateToken(user));
        }

        public async Task<AuthResult?> LoginAsync(LoginDto dto)
        {
            var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null)
                return AuthResult.Fail("Invalid credentials.");

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
            if (result == PasswordVerificationResult.Failed)
                return AuthResult.Fail("Invalid credentials.");

            return AuthResult.Ok(_jwtService.GenerateToken(user));
        }
    }
}
