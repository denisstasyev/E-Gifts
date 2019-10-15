using System;
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
        public DateTime? BirthDate { get; set; } = null;
        public byte[] PasswordHash { get; set; }
        public List<UserGift> UserGifts { get; set; } = new List<UserGift>();
        public List<Payment> Payments { get; set; } = new List<Payment>();
        public List<Session> Sessions { get; set; } = new List<Session>();
        public List<Token> Tokens { get; set; } = new List<Token>();
        public Role Role { get; set; }
        //TODO: registrarion date.
    }
}