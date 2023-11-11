using grubit.common.Enums;

namespace grubit.dac.Dto
{
    public class PrizesDto
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public PrizesStatus Status { get; set; }
        public double PointsNeeded { get; set; }

    }
}
