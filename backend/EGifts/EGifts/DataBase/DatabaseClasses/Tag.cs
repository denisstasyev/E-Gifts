using System.Collections.Generic;

namespace EGifts.DataBase.DatabaseClasses
{
    public class Tag : DataBaseClass
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long Count { get; set; }
        public List<GiftTag> GiftTags { get; set; }
    }
}