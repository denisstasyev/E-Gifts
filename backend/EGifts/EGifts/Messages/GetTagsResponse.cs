using EGifts.DataBase.DatabaseClasses;
using EGifts.Messages.MessageNames;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace EGifts.Messages
{
    public class GetTagsResponse : BaseMessage
    {
        [JsonPropertyName(GiftNames.Tags)]
        public List<Tag> Tags { get; set; }
    }
}