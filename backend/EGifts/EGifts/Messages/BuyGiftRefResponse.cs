using EGifts.DataBase.DatabaseClasses;
using EGifts.Messages.MessageNames;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace EGifts.Messages
{
    public class BuyGiftRefResponse : BaseMessage
    {
        [JsonPropertyName(GiftNames.Reference)]
        public string Reference { get; set; }
    }
}