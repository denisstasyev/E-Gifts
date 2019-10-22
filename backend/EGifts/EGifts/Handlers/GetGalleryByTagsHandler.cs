using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using EGifts.DataBase;
using EGifts.DataBase.DatabaseClasses;
using EGifts.Messages;
using Microsoft.AspNetCore.Http;

namespace EGifts.Handlers
{
    class GetGalleryByTagsHandler : IRequestHandler
    {
        public BaseMessage Handle(HttpContext context)
        {
            var data = CommonMethods.ReadStreamAsync(context.Request.Body).Result;
            // Режем json.
            //var tags = JsonSerializer.Deserialize < List<string>>(data); 
            var tags = data.Trim('[', ']').Split(',');
            using var dbContext = new MainDbContext();
            var result = new HashSet<Gift>(new GiftComparer());
            foreach (var tag in tags.Select(t => t.Trim(' ', '\'', '\"')))
            {
                var tagGifts = dbContext.GetTag(tag).GiftTags.Select(gt => gt.Gift);
                result.UnionWith(tagGifts);
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