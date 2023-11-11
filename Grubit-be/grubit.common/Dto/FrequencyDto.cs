using grubit.dac.entities;

namespace grubit.common.Dto
{
    public  class FrequencyDto
    {
        public DateTime DateTime { get; set; }
        public GeoCoordinates GeoCoordinates { get; set; }
        public Company Company { get; set; }
    }
}
