using grubit.dac.entities;
using Microsoft.EntityFrameworkCore;

namespace grubit.dac
{
    public class GrubitDbContext : DbContext
    {
        public User CurrentUser { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Prize> Prizes { get; set; }
        public DbSet<Frequency> Frequencies { get; set; }

        public GrubitDbContext(DbContextOptions<GrubitDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Define unique constraints on specific columns

            modelBuilder.Entity<Company>()
                .HasKey(c => c.Id);

            modelBuilder.Entity<User>()
                .HasKey(u => u.Id);

            modelBuilder.Entity<Prize>()
                .HasKey(p => p.Code);

            modelBuilder.Entity<Frequency>()
                .HasKey(f => f.Id);

            modelBuilder.Entity<Frequency>()
                .OwnsOne(f => f.GeoCoordinates);

            modelBuilder.Entity<User>()
                .OwnsOne(f => f.MainContact);

            modelBuilder.Entity<Company>()
                .OwnsOne(f => f.Contact);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.UserName) // Unique constraint on the Username attribute
                .IsUnique();

            modelBuilder.Entity<Company>()
                .HasIndex(c => c.CompanyName) // Unique constraint on the Name attribute
                .IsUnique();

  
        }
    }
}
