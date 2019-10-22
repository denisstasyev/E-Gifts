using EGifts.DataBase.DatabaseClasses;
using EGifts.Messages.MessageNames;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace EGifts.Messages
{
    public class GetGiftResponse : BaseMessage
    {
        [JsonPropertyName(GiftNames.Gift)]
        public Gift Gift { get; set; }
    }
}