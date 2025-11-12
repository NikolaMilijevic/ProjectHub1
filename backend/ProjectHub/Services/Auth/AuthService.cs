using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProjectHub.Core.Entities;
using ProjectHub.Data;
using ProjectHub.Shared.DTOs;
using ProjectHub.Core.Interfaces;
using ProjectHub.Api.Responses;

namespace ProjectHub.Services.Auth
{
    public interface IAuthService
    {
        Task<AuthResult?> RegisterAsync(RegisterDto dto);
        Task<AuthResult?> LoginAsync(LoginDto dto);
        Task<AuthResult?> RefreshTokenAsync(string refreshToken);
    }
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IJwtTokenService _jwtService;

        public AuthService(AppDbContext context, IConfiguration config, IJwtTokenService jwtService, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _config = config;
            _jwtService = jwtService;
            _passwordHasher = passwordHasher;
        }

        public async Task<AuthResult> RegisterAsync(RegisterDto dto)
        {
            if (await _context.Users.AsNoTracking().AnyAsync(u => u.Email == dto.Email))
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

            var accessToken = _jwtService.GenerateToken(user).AccessToken;
            var refreshToken = _jwtService.GenerateRefreshToken(user);

            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();

            return AuthResult.Ok(new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token,
                Email = user.Email,
            });
        }

        public async Task<AuthResult> LoginAsync(LoginDto dto)
        {
            var user = await _context.Users.AsNoTracking().SingleOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null)
                return AuthResult.Fail("Invalid credentials.");

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
            if (result == PasswordVerificationResult.Failed)
                return AuthResult.Fail("Invalid credentials.");

            var accessToken = _jwtService.GenerateToken(user).AccessToken;
            var refreshToken = _jwtService.GenerateRefreshToken(user);

            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();

            return AuthResult.Ok(new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token,
                Email = user.Email
            });
        }

        public async Task<AuthResult?> RefreshTokenAsync(string refreshToken)
        {
            var token = await _context.RefreshTokens
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.Token == refreshToken);

            if (token == null || token.IsRevoked || token.ExpiresAt <= DateTime.UtcNow)
                return AuthResult.Fail("Invalid or expired refresh token");

            token.IsRevoked = true;

            var accessToken = _jwtService.GenerateToken(token.User).AccessToken;
            var newRefreshToken = _jwtService.GenerateRefreshToken(token.User);

            await _context.RefreshTokens.AddAsync(newRefreshToken);
            await _context.SaveChangesAsync();

            return AuthResult.Ok(new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = newRefreshToken.Token,
                Email = token.User.Email
            });
        }
    }
}
