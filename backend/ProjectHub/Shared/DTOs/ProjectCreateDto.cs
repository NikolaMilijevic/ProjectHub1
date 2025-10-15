using ProjectHub.Core.Enums;

namespace ProjectHub.Shared.DTOs
{
    public class ProjectCreateDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ClientName { get; set; } = string.Empty;
        public decimal Budget { get; set; }
        public int Progress { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }
        public InitialStatus InitialStatus { get; set; }
        public PriorityLevel PriorityLevel { get; set; }
    }
}
