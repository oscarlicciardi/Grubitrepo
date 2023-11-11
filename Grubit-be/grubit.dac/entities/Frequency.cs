
namespace grubit.dac.entities
{
    public class Frequency
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public GeoCoordinates GeoCoordinates { get; set; }
        public int CompanyId { get; set; }
        public int UserId { get; set; }
    }
}
