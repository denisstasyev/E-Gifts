using System;
using System.Linq;
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

            Guid guid;
            try
            {
                guid = new Guid( context.Request.Query[GiftNames.Guid].ToString());
            }
            catch (FormatException)
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.WrongTokenGuidFormat,
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

            var gift = reference.Gift;
            return new GetModelByRefResponse
            {
                Result = true,
                ModelUrl = gift.ModelUrl,
                ModelUrlApple = gift.ModelUrlApple,
                Text = reference.Text
            };
        }
    }
}