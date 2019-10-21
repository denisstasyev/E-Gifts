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
    class GetGiftHandler : IRequestHandler
    {
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
            return new GetGiftResponse
            {
                Result = true,
                Gift = dbContext.GetGift(id),
            };
        }
    }
}