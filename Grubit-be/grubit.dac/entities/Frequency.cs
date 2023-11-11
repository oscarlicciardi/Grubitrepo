
namespace grubit.dac.entities
{
    public class Frequency
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public GeoCoordinates GeoCoordinates { get; set; }
        public Company Company { get; set; }
        public User User { get; set; }
    }
}
