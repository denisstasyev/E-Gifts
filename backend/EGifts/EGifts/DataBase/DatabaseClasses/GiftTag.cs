namespace EGifts.DataBase.DatabaseClasses
{
    public class GiftTag : DataBaseClass
    {
        public long Id { get; set; }
        public Gift Gift { get; set; }
        public Tag Tag { get; set; }
    }
}