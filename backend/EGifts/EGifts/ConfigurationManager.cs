using System.ComponentModel.DataAnnotations;
using EGifts.Exceptions;
using Microsoft.Extensions.Configuration;

namespace EGifts
{
    public static class ConfigurationManager
    {
        const string EmailSection = "EmailCredential";
        const string EmailValue = "Email";
        const string EmailPasswordValue = "Password";
        const string EmailNameValue = "Name";
        
        static bool _configured;
        static string _email;
        static string _emailPassword;
        static string _emailName;
        
        public static void Configure(IConfiguration configuration)
        {
            _configured = true;

            _email = configuration.GetSection(EmailSection)[EmailValue];
            _emailPassword = configuration.GetSection(EmailSection)[EmailPasswordValue];
            _emailName = configuration.GetSection(EmailSection)[EmailNameValue];
        }
        
        public static string Email => 
            _configured ? _email : throw new EGiftsException("Config data is not loaded");

        public static string EmailPassword =>
            _configured ? _emailPassword : throw new EGiftsException("Config data is not loaded");
        
        public static string EmailName =>
            _configured ? _emailName : throw new EGiftsException("Config data is not loaded");
    }
}