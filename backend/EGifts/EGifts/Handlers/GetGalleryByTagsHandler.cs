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
            var tags = data.Trim('[', ']').Split(',').Select(t => t.Trim(' ', '\'', '\"'));
            using var dbContext = new MainDbContext();
            var result = new Dictionary<long, Gift>();
            
            return new LoginResponseMessage
            {
                Result = true,
                ResultMessage = tags.First(),
            };
        }
    }
}