namespace ProjectHub.Core.Entities
{
    public class BaseEntity<T> 
    {
        public T? Id { get; set; }
        public DateTime CreatedAt { get; private set; }
        public DateTime? ModifiedAt { get; private set; }

        public void SetCreated()
        {
            CreatedAt = DateTime.UtcNow;
            ModifiedAt = CreatedAt;
        }

        public void SetModified()
        {
            ModifiedAt = DateTime.UtcNow;
        }
    }
}
