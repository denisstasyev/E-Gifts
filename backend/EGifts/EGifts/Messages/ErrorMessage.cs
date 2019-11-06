using EGifts.DataBase.DatabaseClasses;
using EGifts.Messages.MessageNames;
using System;
using System.Text.Json.Serialization;

namespace EGifts.Messages
{
    public class ErrorMessage : BaseMessage
    {
        [JsonIgnore]
        public int ErrorCode { get; set; }
    }
}