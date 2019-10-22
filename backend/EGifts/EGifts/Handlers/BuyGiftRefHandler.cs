using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using EGifts.DataBase;
using EGifts.DataBase.DatabaseClasses;
using EGifts.Messages;
using EGifts.Messages.MessageNames;
using Microsoft.AspNetCore.Http;

namespace EGifts.Handlers
{
    class BuyGiftRefHandler : IRequestHandler
    {
        //TODO: вынести в бд!
        const string BaseUrl = "localhost:3000/view/";
        public BaseMessage Handle(HttpContext context)
        {
            if (!context.Request.Query.ContainsKey(CommonNames.Id))
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.NoParameters,
                };
            }

            if (!long.TryParse(context.Request.Query[CommonNames.Id].ToString(), out var id))
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.WrongIdFormat,
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
                Reference = $"{BaseUrl}{guid}",
            };
            dbContext.GiftReferences.Add(reference);
            dbContext.SaveChanges();
            return new BuyGiftRefResponse()
            {
                Result = true,
                Reference = reference.Reference, 
            };
        }
    }
}