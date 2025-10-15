using ProjectHub.Core.Enums;

namespace ProjectHub.Core.Entities
{
    public class Project : BaseEntity<int>
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Budget { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly DueDate { get; set; }
        public InitialStatus InitialStatus { get; set; }
        public PriorityLevel PriorityLevel { get; set; }
        public int Progress { get; set; }


        public int ClientId { get; set; }
        public Client Client { get; set; } = null!;
    }
}
