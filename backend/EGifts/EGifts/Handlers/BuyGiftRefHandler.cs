using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using EGifts.Authorization;
using EGifts.DataBase;
using EGifts.DataBase.DatabaseClasses;
using EGifts.Exceptions;
using EGifts.Messages;
using EGifts.Messages.MessageNames;
using Microsoft.AspNetCore.Http;

namespace EGifts.Handlers
{
    class BuyGiftRefHandler : IRequestHandler
    {
        //TODO: вынести в бд!
        const string BaseUrl = "https://e-gifts.site/view/";
        public BaseMessage Handle(HttpContext context)
        {
            var requestData = context.Request.Query;
            if (!requestData.ContainsKey(CommonNames.Id))
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.NoParameters,
                };
            }
            if (!long.TryParse(requestData[CommonNames.Id].ToString(), out var id))
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.WrongIdFormat,
                };
            }
            
            var text = requestData.GetNullableValue(GiftNames.Text);
            var self = requestData.GetNullableValue(GiftNames.SelfGift);

            User user = null;
            if (requestData.ContainsKey(CommonNames.Token))
            {
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
            }

            if ((null != self) &&
                (null == user))
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.NotAuthorized,
                    ErrorCode = 401,
                };
            }
            
            using var dbContext = new MainDbContext();
            var gift = dbContext.Gifts.FirstOrDefault(g => g.Id == id);
            if (null == gift)
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.NoGift,
                };
            }

            var guid = Guid.NewGuid();
            var reference = new GiftReference
            {
                Gift = gift,
                Guid = guid,
                Text = text,
                Reference = $"{BaseUrl}{guid}",
            };
            dbContext.GiftReferences.Add(reference);
            //gift.PurchasesCount++;
            dbContext.SaveChanges();
            reference = dbContext.GiftReferences.FirstOrDefault(g => g.Guid == guid);

            if (null != user)
            {
                user = dbContext.Users.FirstOrDefault(u => u.Id == user.Id);
                //user.SentGifts.Add(reference);
                reference.Sender = user;
                if (null != self)
                {
                    //user.ReceivedGifts.Add(reference);
                    reference.Owner = user;
                }
            }
            
            dbContext.SaveChanges();
            return new BuyGiftRefResponse()
            {
                Result = true,
                Reference = reference.Reference, 
            };
        }
    }
}