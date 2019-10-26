using System.Collections.Generic;
using System.Text.Json.Serialization;
using EGifts.Messages.MessageNames;

namespace EGifts.DataBase.DatabaseClasses
{
    public class Tag : DataBaseClass
    {
        public Tag(){}

        public Tag(string name)
        {
            Name = name;
        }
        
        [JsonIgnore]
        public long Id { get; set; }
        [JsonPropertyName(CommonNames.Name)]
        public string Name { get; set; }
        [JsonIgnore]
        public long Count { get; set; }
        [JsonIgnore]
        public List<GiftTag> GiftTags { get; set; } = new List<GiftTag>();
    }
}