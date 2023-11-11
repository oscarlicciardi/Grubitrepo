
using grubit.dac;
using grubit.dac.entities;
using grubit.common.Enums;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace grubit_services
{
    public class UserService : IUserService
    {
        private readonly GrubitDbContext _context;
        private readonly IPrizesService _prizesService;

        public UserService(GrubitDbContext context, IPrizesService prizesService)
        {
            _context = context;
            _prizesService = prizesService;
        }

        public Frequency AddFrequency (string companyName, MainContact contact, string? vat, DateTime date, GeoCoordinates coordinates)
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
                var company = AddCompany(companyName, contact, vat);
                frequency.CompanyId = company.Id;

                user.TotalPoints = (int)(user.TotalPoints + company.Points); // updated points of user

            }
            else
            {
                var companyId = _context.Companies
                   .Where(c => c.CompanyName == companyName)
                   .Select(c => c.Id) // Select the Id property
                   .FirstOrDefault();

                frequency.CompanyId = companyId;
                var company = _context.Companies.Where(c => c.Id == companyId).FirstOrDefault();

                user.TotalPoints = (int)(user.TotalPoints + company.Points); // updated points of user
            }
            return frequency;   
        }
        public Company AddCompany(string companyName, MainContact contact, string? vat)
        {
            
            var company = new Company
            {
                CompanyName = companyName,
                Contact = contact,
                Vat = vat,
                Points = 3
            };
            company.CompanyFrequency = CompanyFrequency.Low;
            

                _context.Add(company);
            
            return company;
        }

        public User GetUser()
        {
            var user = _context.Users.Single();

            return user;
        }

     
    }
}
