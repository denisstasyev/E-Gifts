using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using EGifts.Messages.MessageNames;

namespace EGifts.DataBase.DatabaseClasses
{
    public class Gift : DataBaseClass
    {
        // TODO: хранить в базе отдельно каталог и только имена статики, сделать геттер который возвращает полные пути и мапить его. Нужно будет отключить в сериализаторе фильтр ридонли полей.
        [JsonPropertyName(CommonNames.Id)] 
        public long Id { get; set; }
        
        [JsonPropertyName(CommonNames.Name)] 
        public string Name { get; set; }

        [JsonPropertyName(GiftNames.ScaleX)] 
        public float ScaleX { get; set; } = 1;
        
        [JsonPropertyName(GiftNames.ScaleY)] 
        public float ScaleY { get; set; } = 1;
        
        [JsonPropertyName(GiftNames.ScaleZ)] 
        public float ScaleZ { get; set; } = 1;
        
        [JsonPropertyName(GiftNames.Light)]
        public int Light { get; set; }
        
        [JsonPropertyName(GiftNames.Description)]
        public string Description { get; set; }
        
        [JsonPropertyName(GiftNames.Cost)] 
        public double Cost { get; set; }
        
        [JsonPropertyName(GiftNames.PurchasesCount)] 
        public long PurchasesCount { get; set; }
        
        [JsonPropertyName(GiftNames.DonationPercent)]
        public int DonationPercent { get; set; }
        
        [JsonPropertyName(GiftNames.DonationOrganisation)]
        public string DonationOrganisation { get; set; }

        [JsonIgnore] 
        public string CatalogStatic { get; set; }
        [JsonIgnore]
        public string ModelUrl { get; set; } = "";
        [JsonIgnore]
        public string ModelUrlApple { get; set; } = "";
        [JsonIgnore] 
        public List<UserGift> UserGifts { get; set; } = new List<UserGift>();
        [JsonIgnore]
        public DateTime? CreationDate { get; set; } 

        [JsonPropertyName(GiftNames.GiftTags)] 
        public List<GiftTag> GiftTags { get; set; } = new List<GiftTag>();

        [JsonPropertyName(GiftNames.StaticUrls)]
        public List<StaticUrl> StaticUrls { get; set; } = new List<StaticUrl>();

        [JsonPropertyName(GiftNames.CoverImage)]
        public string CoverImage => StaticUrls.FirstOrDefault()?.Name;

    }
}