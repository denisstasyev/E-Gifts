using EGifts.DataBase.DatabaseClasses;
using EGifts.Messages.MessageNames;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace EGifts.Messages
{
    public class GetGalleryResponse : BaseMessage
    {
        [JsonPropertyName(CommonNames.Result)]
        public bool Result { get; set; }
        [JsonPropertyName(CommonNames.ResultMessage)]
        public string ResultMessage { get; set; }
        [JsonPropertyName(GiftNames.Gifts)]
        public List<Gift> Gifts { get; set; }
    }
}