namespace EGifts.DataBase.DatabaseClasses
{
    public class UserGift : DataBaseClass
    {
        public long Id { get; set; }
        public User User { get; set; }
        public Gift Gift { get; set; }
        public bool Self { get; set; }
    }
}