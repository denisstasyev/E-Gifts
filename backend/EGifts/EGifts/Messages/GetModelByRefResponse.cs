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
        [JsonPropertyName(GiftNames.ModelUrlApple)]
        public string ModelUrlApple { get; set; }
        [JsonPropertyName(GiftNames.Text)]
        public string Text { get; set; }
        [JsonPropertyName(GiftNames.ScaleX)] 
        public float ScaleX { get; set; }
        [JsonPropertyName(GiftNames.ScaleY)] 
        public float ScaleY { get; set; }
        [JsonPropertyName(GiftNames.ScaleZ)] 
        public float ScaleZ { get; set; }
        [JsonPropertyName(GiftNames.Light)]
        public int Light { get; set; }
    }
}