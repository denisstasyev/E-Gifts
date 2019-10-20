using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using EGifts.Messages.MessageNames;

namespace EGifts.Messages
{
    public class BaseMessage
    {
        [JsonPropertyName(CommonNames.Result)]
        public bool Result { get; set; }
        [JsonPropertyName(CommonNames.ResultMessage)]
        public string ResultMessage { get; set; }
        
        [JsonIgnore]
        public string ToJsonString => JsonSerializer.Serialize(this, GetType(),
            new JsonSerializerOptions {WriteIndented = true, IgnoreReadOnlyProperties = true});
    }
}