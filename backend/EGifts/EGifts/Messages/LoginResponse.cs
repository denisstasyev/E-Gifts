using System;

namespace EGifts.Messages
{
    [Serializable]
    public struct LoginResponse
    {
        public bool Result;
        public string ResultMessage;
        public string Name;
        public string Mail;
        public string FirstName;
        public string LastName;
        public Guid Token;
    }
}