using System;
using EGifts.DataBase;
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
            var reference = dbContext.GetGiftReference(guid);
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