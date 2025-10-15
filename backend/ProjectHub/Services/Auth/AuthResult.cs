using ProjectHub.Shared.DTOs;

namespace ProjectHub.Services.Auth
{
    public class AuthResult
    {
        public bool Success { get; set; }
        public string? Error { get; set; }
        public AuthResponseDto? Data { get; set; }

        public static AuthResult Fail(string error) => new() { Success = false, Error = error };
        public static AuthResult Ok(AuthResponseDto data) => new() { Success = true, Data = data };
    }
}
