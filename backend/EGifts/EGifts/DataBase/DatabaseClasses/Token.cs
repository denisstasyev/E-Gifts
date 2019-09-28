using System;

namespace EGifts.DataBase.DatabaseClasses
{
    public class Token : DataBaseClass
    {
        public long Id { get; set; }
        public User User { get; set; }
        public Guid Guid { get; set; }
        public DateTime? ValidThru { get; set; }
        // TODO: User-Agent!
    }
}