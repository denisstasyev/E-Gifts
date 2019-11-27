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
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;
using EGifts.Handlers;

namespace EGifts
{
    public class Startup
    {
        const string UserName = "TestAdmin";
        const string Password = "passw0rd";

        const string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            MainDbContext.ConnectionString = configuration.GetConnectionString("DefaultConnection");

            var test = configuration.GetSection("EmailCredential")["Email"];
            var test1 = configuration.GetSection("EmailCredential")["Password"];
            using var dbContext = new MainDbContext();
            dbContext.Database.Migrate();

            try
            {
                using var context = new MainDbContext();
                if (!context.Users.Any(u => u.Name.ToUpper() == UserName.ToUpper()))
                {
                    var passwordHash = MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(Password));
                    context.Users.Add(new User
                    {
                        Name = UserName,
                        PasswordHash = passwordHash,
                        FirstName = "FirstName",
                        LastName = "LastName",
                        Mail = "Test@mail.ru",
                    });
                    context.SaveChanges();
                }

                //context.TestCreateGiftsTags1();
            }
            catch (Exception e)
            {
                WriteLine(e);
                //throw;
            }
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
        }

        // TODO: устанавливать ошибки в ответе!
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // TODO: может вообще как-то красиво сделать через фабрики? По ключу роута определяется.
            // TODO: фабрика будет для парсера и выдачи списка параметров, фабрика для хэндлера будет хавать их.
            // TODO: между ещё фабрика для валидации. Вроде выглядит норм.
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStatusCodePagesWithReExecute("/error", "?code={0}");

            app.Map("/error", ap => ap.Run(async context =>
            {
                await context.Response.WriteAsync($"Error in request: {context.Request.Query["code"]}");
            }));

            app.UseCors(MyAllowSpecificOrigins);

            app.UseStaticFiles(new StaticFileOptions
            {
                ServeUnknownFileTypes = true,
                DefaultContentType = "image/png",
            });

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/api/login", async context =>
                {
                    var handler = new LoginHandler();
                    var result = handler.Handle(context);
                    //if (result is ErrorMessage errorMessage) context.Response.StatusCode = errorMessage.ErrorCode;
                    await context.Response.WriteAsync(result.ToJsonString);
                });//.RequireCors(MyAllowSpecificOrigins);

                endpoints.MapGet("/api/reg", async context =>
                {
                    var handler = new RegistrationHandler();
                    var result = handler.Handle(context);
                    //if (result is ErrorMessage errorMessage) context.Response.StatusCode = errorMessage.ErrorCode;
                    await context.Response.WriteAsync(result.ToJsonString);
                });//.RequireCors(MyAllowSpecificOrigins);
                endpoints.MapGet("/api/get_gallery", async context =>
                {
                    var handler = new GetGalleryHandler();
                    var result = handler.Handle(context);
                    //if (result is ErrorMessage errorMessage) context.Response.StatusCode = errorMessage.ErrorCode;
                    await context.Response.WriteAsync(result.ToJsonString);
                });//.RequireCors(MyAllowSpecificOrigins);
                endpoints.MapGet("/api/get_gallery_by_tags", async context =>
                {
                    var handler = new GetGalleryByTagsHandler();
                    var result = handler.Handle(context);
                    //if (result is ErrorMessage errorMessage) context.Response.StatusCode = errorMessage.ErrorCode;
                    await context.Response.WriteAsync(result.ToJsonString);
                });//.RequireCors(MyAllowSpecificOrigins);
                endpoints.MapGet("/api/get_tags", async context =>
                {
                    var handler = new GetTagsHandler();
                    var result = handler.Handle(context);
                    //if (result is ErrorMessage errorMessage) context.Response.StatusCode = errorMessage.ErrorCode;
                    await context.Response.WriteAsync(result.ToJsonString);
                });//.RequireCors(MyAllowSpecificOrigins);
                endpoints.MapGet("/api/get_model_by_ref", async context =>
                {
                    var handler = new GetModelByRefHandler();
                    var result = handler.Handle(context);
                    //if (result is ErrorMessage errorMessage) context.Response.StatusCode = errorMessage.ErrorCode;
                    await context.Response.WriteAsync(result.ToJsonString);
                });//.RequireCors(MyAllowSpecificOrigins);
                endpoints.MapGet("/api/buy_gift_ref", async context =>
                {
                    var handler = new BuyGiftRefHandler();
                    var result = handler.Handle(context);
                    //if (result is ErrorMessage errorMessage) context.Response.StatusCode = errorMessage.ErrorCode;
                    await context.Response.WriteAsync(result.ToJsonString);
                });//.RequireCors(MyAllowSpecificOrigins);
                endpoints.MapGet("/api/get_gift", async context =>
                {
                    var handler = new GetGiftHandler();
                    var result = handler.Handle(context);
                    //if (result is ErrorMessage errorMessage) context.Response.StatusCode = errorMessage.ErrorCode;
                    await context.Response.WriteAsync(result.ToJsonString);
                });//.RequireCors(MyAllowSpecificOrigins);
                endpoints.MapGet("/api/add_gift_ref_to_own_collection", async context =>
                {
                    var handler = new AddGiftRefToOwnCollection();
                    var result = handler.Handle(context);
                    //if (result is ErrorMessage errorMessage) context.Response.StatusCode = errorMessage.ErrorCode;
                    await context.Response.WriteAsync(result.ToJsonString);
                });//.RequireCors(MyAllowSpecificOrigins);
                endpoints.MapGet("/api/send_by_email", async context =>
                {
                    var handler = new SendRefByEmailHandler();
                    var result = handler.Handle(context);
                    //if (result is ErrorMessage errorMessage) context.Response.StatusCode = errorMessage.ErrorCode;
                    await context.Response.WriteAsync(result.ToJsonString);
                });//.RequireCors(MyAllowSpecificOrigins);
            });

            app.Map("", ap => ap.Run(async context =>
            {
                await context.Response.WriteAsync($"DefaultConnection");
            }));
            //app.Run(async (context) => { await context.Response.WriteAsync("DefaultConnection"); });
        }
    }
}