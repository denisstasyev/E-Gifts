using System;
using static System.Console;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using EGifts.DataBase;
using EGifts.DataBase.DatabaseClasses;
using EGifts.Messages;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Text.Json;

namespace EGifts
{
    public class Startup
    {
        const string UserName = "TestAdmin";
        const string Password = "passw0rd";

        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            MainDbContext.ConnectionString = configuration.GetConnectionString("DefaultConnection");
            
            using var dbContext = new MainDbContext();
            dbContext.Database.Migrate();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                    builder =>
                    {
                        // TODO: брать кхUям к релизу!
                        builder.AllowAnyOrigin(); //.WithOrigins("http://localhost", "http://www.contoso.com");
                    });
            });
            try
            {
                using var context = new MainDbContext();
                if (context.Users.Any(u => u.Name.ToLower() == UserName.ToLower())) return;
                
                var passwordHash = MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(Password));
                context.Users.Add(new User 
                {
                    Name = UserName, 
                    PasswordHash = passwordHash,
                    FirstName = "FirstNane",
                    LastName = "LastName",
                    Mail = "Test@mail.ru",
                });
                context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(MyAllowSpecificOrigins);
            app.UseRouting();

            // TODO: все обработки - выкинуть отсюда.
            app.UseEndpoints(endpoints =>
            {
                var dbContext = new MainDbContext();
                endpoints.MapGet("/login", async context =>
                {
                    LoginResponseMessage responseMessage;
                    if (!context.Request.Query.ContainsKey("login") ||
                        (!context.Request.Query.ContainsKey("password")))
                    {
                        responseMessage = new LoginResponseMessage
                        {
                            Result = false,
                            ResultMessage = ResourcesErrorMessages.NoParameters,
                        };
                    }
                    else
                    {
                        // TODO: реобразование пароля в отдельную функу.
                        string queryPassword = context.Request.Query["password"];
                        var password = MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(queryPassword));
                        var login = context.Request.Query["login"].ToString(); //TODO:  константы.
                        var user = dbContext.Users.FirstOrDefault(u => u.Name.ToLower() == login.ToLower() &&
                                                                       u.PasswordHash.SequenceEqual(password));
                        //TODO: вход по почте. Тогда при создании валидация логина - не должен содержать собаку.
                        if (null == user)
                        {
                            responseMessage = new LoginResponseMessage
                            {
                                Result = false,
                                ResultMessage = ResourcesErrorMessages.WrongLoginPassword,
                            };
                        }
                        else
                        {
                            var token = new Token
                            {
                                Guid = Guid.NewGuid(),
                                UserAgent = "someAgent",
                                ValidThru = DateTime.Now.AddDays(7),
                            };
                            user.Tokens.Add(token);
                            dbContext.SaveChanges();
                            // TODO: б из юзера одной функой получать этот ответ? Или пересечёт транспорт и бд? (
                            responseMessage = new LoginResponseMessage
                            {
                                Result = true,
                                ResultMessage = "",
                                Name = user.Name,
                                FirstName = user.FirstName,
                                LastName = user.LastName,
                                Token = token.Guid,
                                Mail = user.Mail,
                            };
                        }
                    }
                    await context.Response.WriteAsync(responseMessage.ToJsonString);
                }).RequireCors(MyAllowSpecificOrigins);
                
                endpoints.MapGet("/reg", async context =>
                {
                    LoginResponseMessage responseMessage;
                    if (!context.Request.Query.ContainsKey("login") ||
                        (!context.Request.Query.ContainsKey("password")))
                    {
                        responseMessage = new LoginResponseMessage
                        {
                            Result = false,
                            ResultMessage = ResourcesErrorMessages.NoParameters,
                        };
                    }
                    else
                    {
                        // TODO: реобразование пароля в отдельную функу.
                        var requestData = context.Request.Query;
                        string queryPassword = requestData["password"];
                        var password = MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(queryPassword));
                        var login = requestData["login"].ToString(); //TODO:  константы.
                        
                        var mail = requestData.ContainsKey("mail") ? requestData["mail"].ToString() : "";
                        var firstName = requestData.ContainsKey("firstname") ? requestData["firstname"].ToString() : "";
                        var lastName = requestData.ContainsKey("lastname") ? requestData["lastname"].ToString() : "";
                        
                        if (dbContext.Users.Any(u => u.Name.ToLower() == login.ToLower()))
                        {
                            responseMessage = new LoginResponseMessage
                            {
                                Result = false,
                                ResultMessage = ResourcesErrorMessages.LoginExists,
                            };
                        }
                        else if (!string.IsNullOrEmpty(mail) &&
                                 dbContext.Users.Any(u => u.Mail.ToLower() == mail.ToLower()))
                        {
                            responseMessage = new LoginResponseMessage
                            {
                                Result = false,
                                ResultMessage = ResourcesErrorMessages.MailExists,
                            };
                        }
                        else
                        {
                            var token = new Token
                            {
                                Guid = Guid.NewGuid(),
                                UserAgent = "someAgent",
                                ValidThru = DateTime.Now.AddDays(7),
                            };
                            dbContext.SaveChanges();
                            dbContext.Users.Add(new User
                            {
                                Name = login,
                                Mail = mail,
                                FirstName = firstName,
                                LastName = lastName,
                                PasswordHash = password,
                                Tokens = new List<Token> { token }, 
                            });
                            dbContext.SaveChanges();
                            responseMessage = new LoginResponseMessage
                            {
                                Result = true,
                                ResultMessage = "",
                                Name = login,
                                Mail = mail,
                                FirstName = firstName,
                                LastName = lastName,
                                Token = token.Guid,
                            };
                        }
                    }

                    await context.Response.WriteAsync(responseMessage.ToJsonString);
                }).RequireCors(MyAllowSpecificOrigins);
            });
            app.Run((async (context) => { await context.Response.WriteAsync("test"); }));
        }
    }
}