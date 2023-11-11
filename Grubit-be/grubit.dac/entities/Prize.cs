using grubit.common.Enums;

namespace grubit.dac.entities
{
    public class Prize
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code {  get; set; }
        public double PointRequired { get; set; }
        public string Description { get; set; }
        public PrizesStatus Status { get; set; }
        public User User { get; set; }

    }
}
