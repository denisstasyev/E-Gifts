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
            var requestData = context.Request.Query;
            if (!requestData.ContainsKey(LoginNames.Login) ||
                !requestData.ContainsKey(LoginNames.Password))
            {
                return new ErrorMessage
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
            var user = dbContext.GetUser(login, password);

            GiftReference giftReference = null;
            if (requestData.ContainsKey(GiftNames.SentGiftGuid))
            {
                giftReference = dbContext.GetGiftReference(new Guid(requestData[GiftNames.SentGiftGuid].ToString()));
                if (null == giftReference)
                {
                    return new ErrorMessage
                    {
                        Result = false,
                        ResultMessage = ResourcesErrorMessages.NoGiftReference,
                    };
                }

                if (null != giftReference.Sender)
                {
                    return new ErrorMessage
                    {
                        Result = false,
                        ResultMessage = ResourcesErrorMessages.GiftReferenceOwned,
                    };
                }
            }
            GiftReference ownedGiftReference = null;
            if (requestData.ContainsKey(GiftNames.OwnedGiftGuid))
            {
                ownedGiftReference = dbContext.GetGiftReference(new Guid(requestData[GiftNames.OwnedGiftGuid].ToString()));
                if (null == ownedGiftReference)
                {
                    return new ErrorMessage
                    {
                        Result = false,
                        ResultMessage = ResourcesErrorMessages.NoGiftReference,
                    };
                }

                if (null != ownedGiftReference.Owner)
                {
                    return new ErrorMessage
                    {
                        Result = false,
                        ResultMessage = ResourcesErrorMessages.GiftReferenceOwned,
                    };
                }
            }
            
            //TODO: вход по почте. Тогда при создании валидация логина - не должен содержать собаку.
            if (null == user)
            {
                return new ErrorMessage
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
            if (null != giftReference) user.SentGifts.Add(giftReference);
            if (null != ownedGiftReference) user.ReceivedGifts.Add(ownedGiftReference);
            dbContext.SaveChanges();
            user = dbContext.GetUser(login, password);
            // TODO: б из юзера одной функой получать этот ответ? Или пересечёт транспорт и бд? (
            return new LoginResponseMessage
            {
                Result = true,
                ResultMessage = "",
                User = user,
                
                /*
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
