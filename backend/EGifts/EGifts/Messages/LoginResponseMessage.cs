using EGifts.DataBase.DatabaseClasses;
using EGifts.Messages.MessageNames;
using System;
using System.Text.Json.Serialization;

namespace EGifts.Messages
{
    public class LoginResponseMessage : BaseMessage
    {
        [JsonPropertyName(LoginNames.Token)]
        public Guid Token { get; set; }
        [JsonPropertyName(LoginNames.UserData)]
        public User User { get; set; }
    }
}