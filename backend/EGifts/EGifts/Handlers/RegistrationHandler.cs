using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using EGifts.DataBase;
using EGifts.DataBase.DatabaseClasses;
using EGifts.Messages;
using EGifts.Messages.MessageNames;
using Microsoft.AspNetCore.Http;

namespace EGifts.Handlers
{
    public class RegistrationHandler : IRequestHandler
    {
        public BaseMessage Handle(HttpContext context)
        {
            if (!context.Request.Query.ContainsKey(LoginNames.Login) ||
                !context.Request.Query.ContainsKey(LoginNames.Password))
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.NoParameters,
                };
            }

            using var dbContext = new MainDbContext();
            // TODO: реобразование пароля в отдельную функу.
            var requestData = context.Request.Query;
            string queryPassword = requestData[LoginNames.Password];
            var password = MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(queryPassword));
            var login = requestData[LoginNames.Login].ToString();
            var mail = requestData.ContainsKey(LoginNames.Mail) ? requestData[LoginNames.Mail].ToString() : null;

            var firstName = requestData.ContainsKey(LoginNames.FirstName) ? requestData[LoginNames.FirstName].ToString() : null;
            var lastName = requestData.ContainsKey(LoginNames.LastName) ? requestData[LoginNames.LastName].ToString() : null;

            DateTime? birthDate = null;
            var dateString = requestData.ContainsKey(LoginNames.BirthDate)
                ? requestData[LoginNames.BirthDate].ToString()
                : null;
            if (DateTime.TryParse(dateString, out var tmpDate))
            {
                birthDate = tmpDate;
            }

            if (null == birthDate && dateString != null)
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.WrongDateFormat,
                };
            }
            if (dbContext.Users.Any(u => u.Name.ToUpper() == login.ToUpper()))
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.LoginExists,
                };
            }
            if (!string.IsNullOrEmpty(mail) &&
                dbContext.Users.Any(u => u.Mail.ToUpper() == mail.ToUpper()))
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.MailExists,
                };
            }

            var token = new Token
            {
                Guid = Guid.NewGuid(),
                UserAgent = "someAgent",
                ValidThru = DateTime.Now.AddDays(7),
            };
            dbContext.SaveChanges();
            var user = new User
            {
                Name = login,
                Mail = mail,
                BirthDate = birthDate,
                FirstName = firstName,
                LastName = lastName,
                PasswordHash = password,
                Tokens = new List<Token> { token },
            };
            dbContext.Users.Add(user);
            dbContext.SaveChanges();
            return new LoginResponseMessage
            {
                Result = true,
                ResultMessage = "",
                User = user,
                Token = token.Guid,
            };
        }
    }
}
