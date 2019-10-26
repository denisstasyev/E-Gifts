using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using EGifts.DataBase;
using EGifts.DataBase.DatabaseClasses;
using EGifts.Messages;
using EGifts.Messages.MessageNames;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Internal;

namespace EGifts.Handlers
{
    class GetGalleryByTagsHandler : IRequestHandler
    {
        public BaseMessage Handle(HttpContext context)
        {
            
            if (!context.Request.Query.ContainsKey(GiftNames.Tags))
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.NoParameters,
                };
            }

            var tagString = context.Request.Query[GiftNames.Tags].ToString();
            if (string.IsNullOrEmpty(tagString))
            {
                var handler = new GetGalleryHandler();
                return handler.Handle(context);
            }
            
            var tags = context.Request.Query[GiftNames.Tags].ToString().Split(',');
            using var dbContext = new MainDbContext();
            var result = new HashSet<Gift>(new GiftComparer());

            var firstStep = true;
            foreach (var tag in tags.Select(t => t.Trim(' ')).Where(t => !string.IsNullOrEmpty(t)))
            {
                var dbTag = dbContext.GetTagFull(tag);
                if (null == dbTag)
                {
                    return new ErrorMessage
                    {
                        Result = false,
                        ResultMessage = ResourcesErrorMessages.WrongDateFormat,
                    };
                }
                
                var tagGifts = dbTag.GiftTags.Select(gt => gt.Gift);
                if (firstStep)
                {
                    result.UnionWith(tagGifts);
                    firstStep = false;   
                }
                else
                {
                    result.IntersectWith(tagGifts);
                }
            }
            
            return new GetGalleryResponse
            {
                Result = true,
                Gifts = result.ToList(),
            };
        }

        class GiftComparer : IEqualityComparer<Gift>
        {
            public bool Equals(Gift x, Gift y) => x?.Id == y?.Id;

            public int GetHashCode(Gift obj) => (int)obj.Id;
        }
    }
}