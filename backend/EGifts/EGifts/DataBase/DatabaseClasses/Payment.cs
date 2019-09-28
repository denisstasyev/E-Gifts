using System;
using System.Collections.Generic;

namespace EGifts.DataBase.DatabaseClasses
{
    public class Payment : DataBaseClass
    {
        public long Id { get; set; }
        public DateTime? PaymentTime { get; set; }
        public double Value { get; set; }
        public User User { get; set; }
        public Gift Gift { get; set; }
        public bool Self { get; set; } // Was it 4 himself r to smb.
        public User GiftReceiver { get; set; }
    }
}