using System;

namespace EGifts.DataBase.DatabaseClasses
{
    public class Session : DataBaseClass
    {
        public long Id { get; set; }
        public DateTime? Begin { get; set; }
        public DateTime? End { get; set; }
        public User User { get; set; }
        
    }
}