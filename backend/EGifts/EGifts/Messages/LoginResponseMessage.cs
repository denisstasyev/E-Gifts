using EGifts.Messages.MessageNames;
using System;
using System.Text.Json.Serialization;

namespace EGifts.Messages
{
    public class LoginResponseMessage : BaseMessage
    {
        [JsonPropertyName(LoginNames.Result)]
        public bool Result { get; set; }
        [JsonPropertyName(LoginNames.ResultMessage)]
        public string ResultMessage { get; set; }
        [JsonPropertyName(LoginNames.Login)]
        public string Name { get; set; }
        [JsonPropertyName(LoginNames.Mail)]
        public string Mail { get; set; }
        [JsonPropertyName(LoginNames.FirstName)]
        public string FirstName { get; set; }
        [JsonPropertyName(LoginNames.LastName)]
        public string LastName { get; set; }
        [JsonPropertyName(LoginNames.Token)]
        public Guid Token { get; set; }
        [JsonPropertyName(LoginNames.BirthDate)]
        public DateTime? BirthDate { get; set; }
    }
}