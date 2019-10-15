using EGifts.Messages;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EGifts.Handlers
{
    interface IRequestHandler
    {
        BaseMessage Handle(HttpContext context);
    }
}
