
using grubit.dac;
using grubit.dac.entities;
using Microsoft.EntityFrameworkCore;

namespace grubit_services
{
    public class UserService : IUserService
    {
        private readonly GrubitDbContext _context;

        public UserService(GrubitDbContext context)
        {
            _context = context;
        }

        public Frequency AddFrequency (string companyName, Address? address, MainContact contact, string? vat, DateTime date, GeoCoordinates coordinates)
        {
            Frequency frequency = new Frequency
            {
                DateTime = date,
                GeoCoordinates = coordinates,
            };
            var companyExists = _context.Companies.Where(c => c.CompanyName == companyName).Any();
            var user = _context.Users.Single();
            if (!companyExists)
            {
                var company = AddCompany(companyName, address, contact, vat);
                frequency.Company = company;
                frequency.User = user;
              
            }
            else
            {
                frequency.Company = new Company
                {
                    CompanyName = companyName,
                    Address = address,
                    Contact = contact,
                    Vat = vat,
                };
                frequency.User = user;
            }
            return frequency;   
        }
        public Company AddCompany(string companyName, Address? address, MainContact contact, string? vat)
        {
         
            var company = new Company
            {
                CompanyName = companyName,
                Address = address,
                Contact = contact,
                Vat = vat
            };
                _context.Add(company);
            
            return company;
        }

        public User GetUser()
        {
            var user = _context.Users.Single();

            return user;
        }

      /*  public async Task<User?> Login(string username, string password)
        {
    
            username = username.ToLower();

            // Retrieve the user from the database by username
            var user = await _context.Users
                .Where(u => u.UserName == username)
                .SingleOrDefaultAsync();

            if (user == null)
            {
                return null;
            }

            bool isPasswordValid = VerifyPassword(password, user.Password);

            if (!isPasswordValid)
            {
                
                return null;
            }

            return user;
        }

        private bool VerifyPassword(string inputPassword, string hashedPassword)
        {
            return inputPassword == hashedPassword;
        }*/
    }
}
