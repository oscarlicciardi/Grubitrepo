using Microsoft.AspNetCore.Mvc;
using grubit.dac;
using grubit_services;
using grubit.common.Dto;
using System.Threading.Tasks;
using grubit.dac.entities;

namespace Grubit.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController] 
    public class UserController : ControllerBase
    {
        private readonly GrubitDbContext _context;
        private readonly IUserService _userService;

        public UserController(GrubitDbContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }
/*
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<LoginDto>> Login([FromBody] LoginRequest model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userService.Login(model.UserName, model.Password);
                if (user != null)
                {
                    // Authentication successful
                    return Ok(new LoginDto
                    {
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                    });
                }
            }

            // Authentication failed
            return Unauthorized(new { message = "Invalid username or password" });
        }*/

        [HttpGet]
        [Route("profile")]
        public async Task<ActionResult<UserDto>> GetProfile()
        {
            var user = _userService.GetUser();
            return ( new UserDto
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Phone = user.MainContact.Phone,
                Email = user.MainContact.Email,
                TotalPoints = user.TotalPoints,
            });
        }

        [HttpPost]
        [Route("AddCompany")]
        public async Task<IActionResult> CreateFrequency([FromBody] string companyName, string street, string city, string zipcode, string country, string? vat, string phone, string email, GeoCoordinates geoCoordinates)
        {
            Address? address = new Address
            {
                Street = street,
                City = city,
                ZipCode = zipcode,
                Country = country,
            };
            MainContact contact = new MainContact
            {
                Phone = phone,
                Email = email,
            };
            DateTime date = DateTime.Now;

            var frequency = _userService.AddFrequency(companyName, address, contact,vat, date, geoCoordinates);
            return Ok(frequency);
        }
    }
}
