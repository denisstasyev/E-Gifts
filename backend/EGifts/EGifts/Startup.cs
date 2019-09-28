using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EGifts.DataBase;
using EGifts.DataBase.DatabaseClasses;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace EGifts
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            MainDbContext.ConnectionString = configuration.GetConnectionString("DefaultConnection");
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            try
            {
                using var context = new MainDbContext();
                context.Users.Add(new User { Name = "User1" });
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
                    if (context.Request.Query.ContainsKey("user") && context.Request.Query["user"] == userName)
                        await context.Response.WriteAsync("success login!!");
                    else
                        await context.Response.WriteAsync("error login!!");
                });
            });
            app.Run((async (context) =>
            {
                await context.Response.WriteAsync("DefaultPage");
            }));
        }
    }
}
