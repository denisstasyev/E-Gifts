using System.Text.Json.Serialization;
using EGifts.Messages.MessageNames;

namespace EGifts.DataBase.DatabaseClasses
{
    public class GiftTag : DataBaseClass
    {
        [JsonIgnore]
        public long Id { get; set; }
        [JsonIgnore]
        public Gift Gift { get; set; }
        [JsonPropertyName(GiftNames.Tag)]
        public Tag Tag { get; set; }
    }
}