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
    public class LoginHandler : IRequestHandler
    {
        public BaseMessage Handle(HttpContext context)
        {
            if (!context.Request.Query.ContainsKey(LoginNames.Login) ||
                !context.Request.Query.ContainsKey(LoginNames.Password))
            {
                return new LoginResponseMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.NoParameters,
                };
            }

            // TODO: реобразование пароля в отдельную функу.
            string queryPassword = context.Request.Query[LoginNames.Password];
            var password = MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(queryPassword));
            var login = context.Request.Query[LoginNames.Login].ToString();
            using var dbContext = new MainDbContext();
            var user = dbContext.Users.FirstOrDefault(u => u.Name.ToLower() == login.ToLower() &&
                                                           u.PasswordHash.SequenceEqual(password));

            //TODO: вход по почте. Тогда при создании валидация логина - не должен содержать собаку.
            if (null == user)
            {
                return new LoginResponseMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.WrongLoginPassword,
                };
            }

            var token = new Token
            {
                Guid = Guid.NewGuid(),
                UserAgent = "someAgent",
                ValidThru = DateTime.Now.AddDays(7),
            };
            user.Tokens.Add(token);
            dbContext.SaveChanges();
            // TODO: б из юзера одной функой получать этот ответ? Или пересечёт транспорт и бд? (
            return new LoginResponseMessage
            {
                Result = true,
                ResultMessage = "",
                User = user,/*
                Name = user.Name,
                BirthDate = user.BirthDate,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Mail = user.Mail,*/
                Token = token.Guid,
            };
        }
    }
}
