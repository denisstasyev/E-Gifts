using System;
using System.Text.Json.Serialization;

namespace EGifts.Messages
{
    public class LoginResponseMessage : BaseMessage
    {        
        [JsonPropertyName("result")]
        public bool Result { get; set; }
        [JsonPropertyName("result_message")]
        public string ResultMessage { get; set; }
        [JsonPropertyName("login")]
        public string Name { get; set; }
        [JsonPropertyName("mail")]
        public string Mail { get; set; }
        [JsonPropertyName("first_name")]
        public string FirstName { get; set; }
        [JsonPropertyName("last_name")]
        public string LastName { get; set; }
        [JsonPropertyName("token")]
        public Guid Token { get; set; }
    }
}