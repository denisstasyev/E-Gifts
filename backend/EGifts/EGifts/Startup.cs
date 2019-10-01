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

namespace EGifts
{
    public class Startup
    {
        const string UserName = "TestAdmin";
        const string Password = "passw0rd";

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
                    LastName = "LastName"
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

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                var dbContext = new MainDbContext();
                var userName = dbContext.Users.FirstOrDefault()?.Name;
                endpoints.MapGet("/login", async context =>
                {
                    LoginResponse response;
                    if (!context.Request.Query.ContainsKey("login") ||
                        (!context.Request.Query.ContainsKey("password")))
                    {
                        response = new LoginResponse
                        {
                            Result = false,
                            ResultMessage = "No important parameters in request."
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
                        if (null == user)
                        {
                            response = new LoginResponse
                            {
                                Result = false,
                                ResultMessage = "Wrong login password."
                            };
                        }
                        else
                        {
                            var token = new Token
                            {
                                Guid = Guid.NewGuid(),
                                User = user,
                                UserAgent = "someAgent",
                                ValidThru = DateTime.Now.AddDays(7),
                            };
                            
                            // TODO: б из юзера одной функой получать этот ответ? Или пересечёт транспорт и бд? (
                            response = new LoginResponse
                            {
                                Result = true,
                                ResultMessage = "",
                                Name = user.Name,
                                FirstName = user.FirstName,
                                LastName = user.LastName,
                                Token = token.Guid,
                            };
                        }
                    }

                    //TODO: единую функу-сериализатор, или метод-сериализатор у общего базового класса.
                    var jsonFormatter = new DataContractJsonSerializer(typeof(LoginResponse));
                    using var fs = new MemoryStream();
                    jsonFormatter.WriteObject(fs, response);
                    var str = Encoding.UTF8.GetString(fs.ToArray());
                    await context.Response.WriteAsync(str);
                });
            });
            app.Run((async (context) => { await context.Response.WriteAsync("DefaultPage"); }));
        }
    }
}