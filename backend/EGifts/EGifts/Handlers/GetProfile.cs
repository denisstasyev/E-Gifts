using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using EGifts.Authorization;
using EGifts.DataBase;
using EGifts.DataBase.DatabaseClasses;
using EGifts.Exceptions;
using EGifts.Messages;
using EGifts.Messages.MessageNames;
using Microsoft.AspNetCore.Http;

namespace EGifts.Handlers
{
    public class GetProfile : IRequestHandler
    {
        public BaseMessage Handle(HttpContext context)
        {
            var requestData = context.Request.Query;
            if (!requestData.ContainsKey(CommonNames.Token))
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.NoParameters,
                };
            }

            User user;
            try
            {
                var token = new Guid(requestData[CommonNames.Token]);
                user = new Authorizator().Authorize(token);
            }
            catch (NotAuthorizedException)
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.NoOpenSession,
                    ErrorCode = 401,
                };
            }
            catch (AuthTimeoutException)
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.AuthTimeout,
                    ErrorCode = 401,
                };
            }
            catch (FormatException)
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.WrongTokenGuidFormat,
                };
            }
            catch (Exception)
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.AuthError,
                };
            }

            if (null == user)
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.AuthError,
                };
            }
            // TODO: б из юзера одной функой получать этот ответ? Или пересечёт транспорт и бд? (
            return new LoginResponseMessage
            {
                Result = true,
                ResultMessage = "",
                User = user,
            };
        }
    }
}
