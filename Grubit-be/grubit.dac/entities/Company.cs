
using grubit.common.Enums;

namespace grubit.dac.entities
{
    public class Company
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public MainContact Contact {  get; set; }
        public string? Vat {  get; set; }
        public Address? Address { get; set; }
        public double Points { get; set; }
        public CompanyFrequency CompanyFrequency { get; set; }
    }
}
