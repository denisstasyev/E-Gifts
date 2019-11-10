using System;
using EGifts.DataBase;
using EGifts.DataBase.DatabaseClasses;
using EGifts.Exceptions;

namespace EGifts.Authorization
{
    public class Authorizator
    {
        public User Authorize(Guid authTokenGuid)
        {
            using var dbContext = new MainDbContext();
            var token = dbContext.GetToken(authTokenGuid);
            if (null == token)
                throw new NotAuthorizedException();
            if (token.ValidThru < DateTime.Now)
            {
                dbContext.Tokens.Remove(token);
                throw new AuthTimeoutException();
            }

            return token.User;
        }
    }
}