using EGifts.DataBase.DatabaseClasses;
using EGifts.Messages.MessageNames;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace EGifts.Messages
{
    public class GetModelByRefResponse : BaseMessage
    {
        [JsonPropertyName(GiftNames.ModelUrl)]
        public string ModelUrl { get; set; }
    }
}