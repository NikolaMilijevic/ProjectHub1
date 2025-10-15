using ProjectHub.Core.Enums;

namespace ProjectHub.Shared.DTOs
{
    public class ProjectQueryDto
    {
        public string? Search {  get; set; }
        public PriorityLevel? Priority { get; set; }
        public InitialStatus? InitialStatus { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? SortBy { get; set; } = "CreatedAt";
        public string? SortOrder { get; set; } = "desc";
    }
}
