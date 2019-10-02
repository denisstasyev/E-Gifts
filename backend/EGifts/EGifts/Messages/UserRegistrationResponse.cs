using System;

namespace EGifts.Messages
{
    [Serializable]
    public struct UserRegistrationResponse
    {
        public bool Result;
        public string ResultMessage;
    }
}