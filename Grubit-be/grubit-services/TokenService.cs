using grubit.dac.entities;
using System.Security.Claims;
using System.Text;

namespace grubit_services
{
    public class TokenService
    {
    /*public string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourSecretKey"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            // Add additional claims as needed
        };

            var token = new JwtSecurityToken(
                "YourIssuer",
                "YourAudience",
                claims,
                expires: DateTime.Now.AddHours(1), // Token expiration time
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    */
    }
}
