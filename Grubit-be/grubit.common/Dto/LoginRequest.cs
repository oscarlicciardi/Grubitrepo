

namespace grubit.common.Dto
{
    public class LoginRequest
    {
        public LoginRequest(string userName, string password)
        {
            UserName = userName;
            Password = password;
        }

        public string Password { get; set; }
        public string UserName { get; set; }

    }
}
