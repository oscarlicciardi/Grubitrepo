using grubit.dac;
using Grubit.api;
using grubit_services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Configuration.AddJsonFile("C:\\Users\\Admin\\source\\repos\\Grubit\\Grubitrepo\\Grubit-be\\Grubit\\appsettings.json", optional: true, reloadOnChange: true);
var configuration = builder.Configuration;
builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPrizesService, PrizesService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<GrubitDbContext>(options =>
{
    options.UseSqlite(configuration.GetConnectionString("Database"),
        b => b.MigrationsAssembly("Grubit.api"));
});
builder.Services.AddScoped<Seeder>(); // Add the Seeder as a service

var app = builder.Build();

// Use Seeder to check and reset the database if necessary
var scopedFactory = app.Services.GetService<IServiceScopeFactory>();

using (var scope = scopedFactory.CreateScope())
{
    var seeder = scope.ServiceProvider.GetService<Seeder>();
    seeder.ResetDatabase(); // Reset the database
    seeder.SeedDatabase(); // Seed the data
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
