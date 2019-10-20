using System;

namespace EGifts.DataBase.DatabaseClasses
{
    public class GiftReference : DataBaseClass
    {
        public long Id { get; set; }
        public string Reference { get; set; }
        public Guid Guid { get; set; }
        public Gift Gift { get; set; }
        public User Owner { get; set; }
    }
}