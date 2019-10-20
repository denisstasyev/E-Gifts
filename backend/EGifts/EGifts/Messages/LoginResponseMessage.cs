using EGifts.DataBase.DatabaseClasses;
using EGifts.Messages.MessageNames;
using System;
using System.Text.Json.Serialization;

namespace EGifts.Messages
{
    public class LoginResponseMessage : BaseMessage
    {
        [JsonPropertyName(CommonNames.Result)]
        public bool Result { get; set; }
        [JsonPropertyName(CommonNames.ResultMessage)]
        public string ResultMessage { get; set; }
        [JsonPropertyName(LoginNames.Token)]
        public Guid Token { get; set; }
        [JsonPropertyName(LoginNames.UserData)]
        public User User { get; set; }
    }
}