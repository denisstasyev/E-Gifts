using EGifts.Messages.MessageNames;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace EGifts.DataBase.DatabaseClasses
{
    public class User : DataBaseClass
    {
        [JsonIgnore]
        public long Id { get; set; }
        [JsonIgnore]
        public byte[] PasswordHash { get; set; }
        [JsonIgnore]
        public List<UserGift> UserGifts { get; set; } = new List<UserGift>();
        [JsonIgnore]
        public List<GiftReference> SentGifts { get; set; } = new List<GiftReference>();
        [JsonIgnore]
        public List<GiftReference> RecievedGifts { get; set; } = new List<GiftReference>();
        [JsonIgnore]
        public List<Payment> Payments { get; set; } = new List<Payment>();
        [JsonIgnore]
        public List<Session> Sessions { get; set; } = new List<Session>();
        [JsonIgnore]
        public List<Token> Tokens { get; set; } = new List<Token>();
        [JsonIgnore]
        public Role Role { get; set; }


        [JsonPropertyName(LoginNames.Login)]
        public string Name { get; set; } // Login.
        [JsonPropertyName(LoginNames.Mail)]
        public string Mail { get; set; }
        [JsonPropertyName(LoginNames.FirstName)]
        public string FirstName { get; set; }
        [JsonPropertyName(LoginNames.LastName)]
        public string LastName { get; set; }
        [JsonPropertyName(LoginNames.BirthDate)]
        public DateTime? BirthDate { get; set; }
        [JsonPropertyName(LoginNames.RegistrationDate)]
        public DateTime? RegistrarionDate { get; set; }
    }
}