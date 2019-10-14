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

namespace EGifts.Handlers
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
                if (context.Users.Any(u => u.Name.ToUpper() == UserName.ToUpper())) return;

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
                WriteLine(e);
                //throw;
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
                    var handler = new LoginHandler();
                    await context.Response.WriteAsync(handler.Handle(context).ToJsonString);
                }).RequireCors(MyAllowSpecificOrigins);

                endpoints.MapGet("/reg", async context =>
                {
                    var handler = new RegistrationHandler();
                    await context.Response.WriteAsync(handler.Handle(context).ToJsonString);
                }).RequireCors(MyAllowSpecificOrigins);
            });
            app.Run(async (context) =>
            {
                await context.Response.WriteAsync(DateTime.Parse("10.10.2019").ToString());

            });
        }
    }
}