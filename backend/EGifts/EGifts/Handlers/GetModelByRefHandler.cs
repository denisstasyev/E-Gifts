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
    class GetModelByRefHandler : IRequestHandler
    {
        public BaseMessage Handle(HttpContext context)
        {
            if (!context.Request.Query.ContainsKey(GiftNames.Guid))
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.NoParameters,
                };
            }
            var guid = new Guid( context.Request.Query[GiftNames.Guid].ToString());
            using var dbContext = new MainDbContext();
            var reference = dbContext.GiftReferences.FirstOrDefault(r => r.Guid == guid);
            if (null == reference)
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.ReferenceNotValid,
                };
            }
            return new GetModelByRefResponse
            {
                Result = true,
                ModelUrl = reference.Gift.ModelUrl,
            };
        }
    }
}