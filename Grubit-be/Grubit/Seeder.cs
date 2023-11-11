using grubit.dac.entities;
using grubit.dac;
using Microsoft.EntityFrameworkCore;
using grubit.common.Enums;

namespace Grubit.api
{
    public class Seeder
    {
        private readonly GrubitDbContext _context;

        public Seeder(GrubitDbContext context)
        {
            _context = context;
        }

        public void SeedDatabase()
        {
            _context.Database.Migrate(); // Ensure the database is created and up-to-date

            if (!_context.Users.Any())
            {
                // Seed Users
                var user = new User
                {   UserName = "Frank90",
                    FirstName = "Frank",
                    LastName = "Doe",
                    Password="Frank",
                    MainContact = new MainContact
                    {
                        Phone = "+39 00001234",
                        Email = "Frank90@email.com"
                    },
                    TotalPoints = 300
                };
           

                _context.Users.Add(user);

                var prizes = new List<Prize>
                {
                    new Prize
                    {
                        Name = "Restaurant Voucher 1",
                        Description = "Enjoy a meal at Restaurant A",
                        Code = "VOUCHER001",
                        PointRequired = 100,
                        Status = PrizesStatus.Available,
                        UserId = user.Id
                    },
                    new Prize
                    {
                        Name = "Restaurant Voucher 2",
                        Description = "Dine in style at Restaurant B",
                        Code = "VOUCHER002",
                        PointRequired = 350,
                        Status = PrizesStatus.NotAvailable,
                        UserId = user.Id
                    },
                    new Prize
                    {
                        Name = "Discount Coupon 1",
                        Description = "Get a discount at Restaurant C",
                        Code = "DISCOUNT001",
                        PointRequired = 50,
                        Status = PrizesStatus.Used,
                        UserId = user.Id
                    },
                    new Prize
                    {
                        Name = "Discount Coupon 2",
                        Description = "Save on your bill at Restaurant D",
                        Code = "DISCOUNT002",
                        PointRequired = 75,
                        Status = PrizesStatus.Available,
                        UserId = user.Id    
                    },
                    new Prize
                    {
                        Name = "Special Offer 1",
                        Description = "Exclusive offer for Restaurant E",
                        Code = "OFFER001",
                        PointRequired = 800,
                        Status = PrizesStatus.NotAvailable,
                        UserId = user.Id
                    },
                    new Prize
                    {
                        Name = "Special Offer 2",
                        Description = "Limited-time deal at Restaurant F",
                        Code = "OFFER002",
                        PointRequired = 90,
                        Status = PrizesStatus.Used,
                        UserId = user.Id                    },
                    new Prize
                    {
                        Name = "Gift Card",
                        Description = "Redeem a gift card for Restaurant G",
                        Code = "GIFTCARD001",
                        PointRequired = 900,
                        Status = PrizesStatus.NotAvailable,
                        UserId = user.Id
                    }
                };

                _context.Prizes.AddRange(prizes);

                var frequencies = new List<Frequency>();

                var companies = new List<Company>
                {
                    new Company
                    {
                        CompanyName = "Mountain Logistics Corporation",
                        Contact = new MainContact
                        {
                            Email = "contact1@abccorp.com",
                            Phone = "123-456-7890"
                        },
                        Vat = "123456789",
                        Points = 100
                    },
                    new Company
                    {
                        CompanyName = "Transport Logistics Ltd",
                        Contact = new MainContact
                        {
                            Email = "contact2@xyzltd.com",
                            Phone = "987-654-3210"
                        },
                        Vat = "987654321",
                        Points = 200
                    },
                    new Company
                    {
                        CompanyName = "Logistics Inc",
                        Contact = new MainContact
                        {
                            Email = "contact3@abcdinc.com",
                            Phone = "555-123-4567"
                        },
                        Vat = "555555555",
                        Points = 150
                    },
                    new Company
                    {
                        CompanyName = "Carrier Company",
                        Contact = new MainContact
                        {
                            Email = "test@company.com",
                            Phone = "777-888-9999"
                        },
                        Vat = "111111111",
                        Points = 250
                    },
                    new Company
                    {
                        CompanyName = "Truck Enterprises",
                        Contact = new MainContact
                        {
                            Email = "contact5@sampleent.com",
                            Phone = "333-222-1111"
                        },
                        Vat = "222222222",
                        Points = 300
                    }
                };

                foreach (var company in companies)
                {
                    for (int i = 0; i < 10; i++)
                    {
                        frequencies.Add(new Frequency
                        {
                            DateTime = DateTime.Now.AddDays(i),
                            GeoCoordinates = new GeoCoordinates{
                                Latitude = i * 19087, 
                                Longitude = i * 17645
                            },

                            CompanyId = company.Id,
                        });
                    }
                }

                _context.Frequencies.AddRange(frequencies);
                _context.SaveChanges();


                _context.Companies.AddRange(companies);
                _context.SaveChanges();


                _context.SaveChanges();
            }
        }

        public void ResetDatabase()
        {
            // Drop and recreate the database
            _context.Database.EnsureDeleted();
            _context.Database.Migrate();
        }
    }


}
