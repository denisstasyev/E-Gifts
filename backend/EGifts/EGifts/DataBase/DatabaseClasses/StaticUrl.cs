﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using EGifts.Messages.MessageNames;

namespace EGifts.DataBase.DatabaseClasses
{
    public class StaticUrl : DataBaseClass
    {
        [JsonIgnore]
        public long Id { get; set; }
        [JsonPropertyName(GiftNames.ImageUrl)]
        public string Name { get; set; }
    }
}
