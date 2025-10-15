using ProjectHub.Core.Enums;
using System;

namespace ProjectHub.Shared.DTOs
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Budget { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }
        public string ClientName { get; set; }
        public InitialStatus InitialStatus { get; set; }
        public PriorityLevel PriorityLevel { get; set; }
        public int Progress { get; set; }
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }
    }
}
