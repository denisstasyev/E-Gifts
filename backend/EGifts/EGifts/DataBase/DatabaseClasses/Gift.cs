using System.Collections.Generic;

namespace EGifts.DataBase.DatabaseClasses
{
    public class Gift : DataBaseClass
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Cost { get; set; }
        public int DonationPercent { get; set; }
        public string DonationOrganisation { get; set; }
        public List<GiftTag> GiftTags { get; set; }
        public List<UserGift> UserGifts { get; set; }
    }
}