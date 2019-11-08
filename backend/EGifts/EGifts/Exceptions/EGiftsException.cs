using System;
using System.Runtime.Serialization;

namespace EGifts.Exceptions
{
    public class EGiftsException : ApplicationException
    {
        public EGiftsException() : base() { }

        public EGiftsException(string message) : base(message) { }

        public EGiftsException(string message, Exception innerException) : base(message, innerException) { }
    }
}