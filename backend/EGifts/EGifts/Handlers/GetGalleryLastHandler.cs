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
    class GetGalleryLastHandler : IRequestHandler
    {
        public BaseMessage Handle(HttpContext context)
        {
            using var dbContext = new MainDbContext();
            return new GetGalleryResponse
            {
                Result = true,
                Gifts = dbContext.GetGifts().OrderByDescending(g => g.CreationDate).Take(5).ToList(),
            };
        }
    }
}