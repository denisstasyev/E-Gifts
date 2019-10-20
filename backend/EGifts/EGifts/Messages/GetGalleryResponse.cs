using EGifts.DataBase.DatabaseClasses;
using EGifts.Messages.MessageNames;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace EGifts.Messages
{
    public class GetGalleryResponse : BaseMessage
    {
        [JsonPropertyName(GiftNames.Gifts)]
        public List<Gift> Gifts { get; set; }
    }
}