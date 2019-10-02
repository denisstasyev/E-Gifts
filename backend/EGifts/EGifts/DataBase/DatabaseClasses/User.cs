using System.Collections.Generic;

namespace EGifts.DataBase.DatabaseClasses
{
    public class User : DataBaseClass
    {
        public long Id { get; set; }
        public string Name { get; set; } // Login.
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Mail { get; set; }
        public int Age { get; set; }
        public byte[] PasswordHash { get; set; }
        public List<UserGift> UserGifts { get; set; }
        public List<Payment> Payments { get; set; }
        public List<Session> Sessions { get; set; }
        public List<Token> Tokens { get; set; }
    }
}