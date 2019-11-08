using EGifts.DataBase.DatabaseClasses;
using EGifts.Messages.MessageNames;
using System;
using System.Text.Json.Serialization;

namespace EGifts.Messages
{
    public class UserDataMessage : BaseMessage
    {
        [JsonPropertyName(LoginNames.UserData)]
        public User User { get; set; }
    }
}