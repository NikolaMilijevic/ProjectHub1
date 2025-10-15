using ProjectHub.Core.Enums;

namespace ProjectHub.Shared.DTOs
{
    public class ProjectUpdateDto
    {
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public decimal Budget { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }
        public InitialStatus InitialStatus { get; set; }
        public PriorityLevel PriorityLevel { get; set; }
        public string ClientName { get; set; } = "";
        public int Progress { get; set; }
    }
}
