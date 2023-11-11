
namespace grubit.dac.entities
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public MainContact MainContact { get; set; }
        public int TotalPoints {  get; set; }
    }
}
