using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace EGifts
{
    public static class HttpParamsDictHelper
    {
        /// <summary>
        /// Get value from parameters as string, or returns null.
        /// </summary>
        /// <param name="collection"></param>
        /// <param name="paramName"></param>
        /// <returns>Null if no such parameter, parameter value in string otherwise.</returns>
        public static string GetNullableValue(this IQueryCollection collection, string paramName)
        {
            return  collection.ContainsKey(paramName) ? collection[paramName].ToString() : null;
        }
    }
}