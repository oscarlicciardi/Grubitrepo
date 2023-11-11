
using grubit.dac.entities;

namespace grubit_services
{
    public interface IUserService
    {
        //Task<User> Login(string username, string password);
        User GetUser();
        Frequency AddFrequency(string companyName,  MainContact contact, string? vat, DateTime date, GeoCoordinates coordinates);
        Company AddCompany(string companyName, MainContact contact, string? vat);
    }
}
