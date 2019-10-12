using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace EGifts.Messages
{
    public class BaseMessage
    {
        [JsonIgnore]
        public string ToJsonString => JsonSerializer.Serialize(this, GetType(), new JsonSerializerOptions { WriteIndented = true });
    }
}
