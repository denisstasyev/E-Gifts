using System;
using System.Collections.Generic;
using System.Linq;
using EGifts.DataBase.DatabaseClasses;
using Microsoft.EntityFrameworkCore;

namespace EGifts.DataBase
{
    public class MainDbContext : DbContext
    {
        public static string ConnectionString { get; set; }

        #region _Tables_

        public DbSet<Gift> Gifts { get; set; }
        public DbSet<GiftReference> GiftReferences { get; set; }
        public DbSet<GiftTag> GiftTags { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<StaticUrl> StaticUrls { get; set; }
        public DbSet<Tag> Tags { get; set;  }
        public DbSet<Token> Tokens { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserGift> UserGifts { get; set; }
        

        #endregion  
        
        public MainDbContext()
        {
            if (string.IsNullOrEmpty(ConnectionString))
            {
                throw new Exception("No Connection string in MainDbContext!");
            }
            //Database.EnsureCreated();
            //Database.Migrate();            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(ConnectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Payment>()
                .HasOne(p => p.User)
                .WithMany(u => u.Payments);
        }

        public IEnumerable<Gift> GetGifts()
        {
            return Gifts.Include(g => g.StaticUrls)
                .Include(g => g.GiftTags)
                    .ThenInclude(gt => gt.Tag);
        }

        public Gift GetGift(long id)
        {
            return Gifts.Where(g => g.Id == id)
                .Include(g => g.StaticUrls)
                .Include(g => g.GiftTags)
                    .ThenInclude(gt => gt.Tag)
                .FirstOrDefault();
        }

        public IEnumerable<Tag> GetTags()
        {
            return Tags.Include(g => g.GiftTags)
                            .ThenInclude(gt => gt.Gift);
        }

        public Tag GetTag(string name)
        {
            return Tags.Where(t=> t.Name.ToUpper() == name.ToUpper())
                        .Include(g => g.GiftTags)
                            .ThenInclude(gt => gt.Gift)
                                .ThenInclude(g => g.StaticUrls)
                        .FirstOrDefault();
        }

        public GiftReference GetGiftReference(Guid guid)
        {
            return GiftReferences.Include(r => r.Gift).FirstOrDefault(r => r.Guid == guid);
        }
        
        void Clear()
        {
            /*
            Database.EnsureDeleted();
            Database.Migrate();
            */

            GiftTags.RemoveRange(GiftTags);
            StaticUrls.RemoveRange(StaticUrls);
            Gifts.RemoveRange(Gifts);
            GiftReferences.RemoveRange(GiftReferences);
            Tags.RemoveRange(Tags);
            
        }

        public void TestCreateGiftsTags()
        {
            Clear();

            var gift = new Gift
            {
                Name = "gift1",
                CatalogStatic = "g1/",
                StaticUrls = new List<StaticUrl> {new StaticUrl {Name = "g1/Screenshot_45.png" }, new StaticUrl {Name = "g1/Screenshot_55.png" } },
                ModelUrl = "g1/"+"testModelUrl1",
            };
                
            var gift2 = new Gift
            {
                Name = "gift2",
                CatalogStatic = "g2/",
                StaticUrls = new List<StaticUrl> {new StaticUrl { Name = "g2/1547367999_1.jpg" }, new StaticUrl { Name = "g2/volki-zhivotnye-43887.jpg" } },
                ModelUrl = "g2/" + "testModelUrl1",
            };
            
            var tags = new[] {"Christmas", "New Year", "Birthday", "Anniversary", "Kids", "Women", "Men"};
            Tags.AddRange(tags.Select(t => new Tag {Name = t}));

            var tag1 = new Tag
            {
                Name = "t1",
                    
            };
                
            var tag2 = new Tag
            {
                Name = "t2",
            };
            Gifts.Add(gift);
            Gifts.Add(gift2);
            Tags.Add(tag1);
            Tags.Add(tag2);
            GiftTags.Add(new GiftTag
            {
                Gift = gift,
                Tag = tag1,
            });
            GiftTags.Add(new GiftTag
            {
                Gift = gift,
                Tag = tag2
            });
            GiftTags.Add(new GiftTag
            {
                Gift = gift2,
                Tag = tag1
            });
            SaveChanges();
        }
    }
}