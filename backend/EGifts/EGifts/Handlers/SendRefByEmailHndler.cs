using System;
using System.Linq;
using System.Net;
using System.Net.Mail;
using EGifts.DataBase;
using EGifts.Messages;
using EGifts.Messages.MessageNames;
using Microsoft.AspNetCore.Http;

namespace EGifts.Handlers
{
    class SendRefByEmailHndler
    {
        const string Mail = "test @test.ru";
        const string Name = "EGifts-bot";
        const string Password = "password";
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

            // ����������� - ������������� ����� � ������������ � ������ ���
            var from = new MailAddress(Mail, Name);
            // ���� ����������
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
            // ������� ������ ���������
            MailMessage message = new MailMessage(from, to)
            {
                // ���� ������
                Subject = "A gift for you!",
                // ����� ������
                Body = $"<h2>Your friend sent a gift to you.<br>It exists in augmented reality, u can see your gift on our site by reference below. Good luck!)</h2><h2>{reference.Reference}<h2>",
                // ������ ������������ ��� html
                IsBodyHtml = true
            };
            // ����� smtp-������� � ����, � �������� ����� ���������� ������
            var smtp = new SmtpClient("smtp.mail.ru", 25)
            {
                // ����� � ������
                Credentials = new NetworkCredential(Mail, Password),
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