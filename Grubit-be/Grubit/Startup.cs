
using Microsoft.EntityFrameworkCore;
using grubit.dac;
using grubit_services; 

namespace Grubit.api
{
    public class Startup
        {
            public Startup(IConfiguration configuration)
            {
                Configuration = configuration;
            }

            public IConfiguration Configuration { get; }

            public void ConfigureServices(IServiceCollection services)
            {
                services.AddDbContext<GrubitDbContext>(options =>
                {
                    options.UseSqlite(Configuration.GetConnectionString("Database"));
                });

                services.AddSwaggerGen();
                services.AddScoped<IUserService, UserService>();
                services.AddScoped<IPrizesService, PrizesService>();

                services.AddControllers();

             
            }

            public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
            {
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();

                app.UseDeveloperExceptionPage();
            }
            else
                {
                    app.UseHsts();
                }

                app.UseHttpsRedirection();

                app.UseRouting();

                app.UseAuthorization();

                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                });
            }
        }
    }


