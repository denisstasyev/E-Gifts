using System;
using System.Text.Json.Serialization;
using EGifts.Messages.MessageNames;

namespace EGifts.DataBase.DatabaseClasses
{
    public class GiftReference : DataBaseClass
    {
        [JsonIgnore]
        public long Id { get; set; }
        [JsonIgnore]
        public User Owner { get; set; }
        [JsonIgnore]
        public User Sender { get; set; }
        
        [JsonPropertyName(GiftNames.Reference)]
        public string Reference { get; set; }
        
        [JsonPropertyName(GiftNames.Guid)]
        public Guid Guid { get; set; }
        
        [JsonPropertyName(GiftNames.Text)]
        public string Text { get; set; }
        
        [JsonPropertyName(GiftNames.Gift)]
        public Gift Gift { get; set; }
    }
}