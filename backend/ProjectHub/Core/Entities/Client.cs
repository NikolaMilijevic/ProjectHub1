namespace ProjectHub.Core.Entities
{
    public class Client : BaseEntity<int>
    {
        public string Name { get; set; } = string.Empty;
        public ICollection<Project> Projects { get; set; } = new List<Project>();
    }
}
