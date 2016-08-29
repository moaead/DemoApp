using DemoApp.Model;
using Microsoft.EntityFrameworkCore;

namespace DemoApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().ToTable("Product", "Production");
            modelBuilder.Entity<WorkOrder>().ToTable("WorkOrder", "Production");
        }

        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<WorkOrder> WorkOrders { get; set; }
    }
}