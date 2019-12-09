using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using EGifts.DataBase;
using EGifts.Messages;
using EGifts.Messages.MessageNames;
using Microsoft.AspNetCore.Http;

namespace EGifts.Handlers
{
    class SendRefByEmailHandler
    {
        public BaseMessage Handle(HttpContext context)
        {
            if (!context.Request.Query.ContainsKey(GiftNames.Guid))
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.NoParameters,
                };
            }
            if (!context.Request.Query.ContainsKey(GiftNames.Email))
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.NoParameters,
                };
            }

            var mail = context.Request.Query[GiftNames.Email].ToString();

            Guid guid;
            try
            {
                guid = new Guid( context.Request.Query[GiftNames.Guid].ToString());
            }
            catch (FormatException)
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.WrongTokenGuidFormat,
                };
            }
            
            using var dbContext = new MainDbContext();
            var reference = dbContext.GetGiftReference(guid);
            if (null == reference)
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.ReferenceNotValid,
                };
            }

            var from = new MailAddress(ConfigurationManager.Email, ConfigurationManager.EmailName);
            MailAddress to;
            try
            {
                to = new MailAddress(mail);
            }
            catch
            {
                return new ErrorMessage
                {
                    Result = false,
                    ResultMessage = ResourcesErrorMessages.EmailNotValid,
                };
            }

            var html = File.ReadAllText("mail.html").Replace("https://e-gifts.site", reference.Reference);
            var message = new MailMessage(from, to)
            {
                Subject = "A gift for you!",
                Body = html,
                IsBodyHtml = true
            };
            // Адрес smtp-сервера и порт, с которого будем отправлять письмо
            var smtp = new SmtpClient("smtp.mail.ru", 25)
            {
                Credentials = new NetworkCredential(ConfigurationManager.Email, ConfigurationManager.EmailPassword),
                EnableSsl = true
            };
            smtp.Send(message);

            return new BaseMessage
            {
                Result = true,
            };
        }
    }
}