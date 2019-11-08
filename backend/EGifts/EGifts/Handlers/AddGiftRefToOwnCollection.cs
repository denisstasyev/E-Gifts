using System;
using EGifts.Authorization;
using EGifts.DataBase;
using EGifts.DataBase.DatabaseClasses;
using EGifts.Exceptions;
using EGifts.Messages;
using EGifts.Messages.MessageNames;
using Microsoft.AspNetCore.Http;

namespace EGifts.Handlers
{
    public class AddGiftRefToOwnCollection: IRequestHandler
    {
        public BaseMessage Handle(HttpContext context)
        {
            var requestData = context.Request.Query;
            if (!requestData.ContainsKey(GiftNames.Guid))
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.NoParameters,
                };
            }
            if (!requestData.ContainsKey(CommonNames.AuthorizationToken))
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.NoParameters,
                };
            }

            Guid guid;
            User user;
            try
            {
                var token = new Guid(requestData[CommonNames.AuthorizationToken]);
                guid = new Guid( requestData[GiftNames.Guid].ToString());
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

            using var dbContext = new MainDbContext();
            var reference = dbContext.GetGiftReference(guid);
            if (null == reference)
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.ReferenceNotValid,
                };
            }
            
            user.ReceivedGifts.Add(reference);
            dbContext.SaveChanges();
            
            return new UserDataMessage
            {
                Result = false,
                User = user,
            };
        }
    }
}