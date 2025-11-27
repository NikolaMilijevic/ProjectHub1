namespace ProjectHub.Shared.DTOs
{
    public class UserInfoDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role {  get; set; } = string.Empty;
    }
    public class DashboardStatsDto
    {
        public int TotalUsers { get; set; }
        public int TotalProjects { get; set; }
        public int TotalVisitors { get; set; }
        public List<UserInfoDto> Users { get; set; } = new List<UserInfoDto>();
    }
}
