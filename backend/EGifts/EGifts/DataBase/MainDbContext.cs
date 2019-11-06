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
        public DbSet<Tag> Tags { get; set; }
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
            modelBuilder.Entity<GiftReference>()
                .HasOne(gr => gr.Owner)
                .WithMany(u => u.RecievedGifts);
            modelBuilder.Entity<GiftReference>()
                .HasOne(gr => gr.Sender)
                .WithMany(u => u.SentGifts);
        }

        // TODO: вынести функции доступа.
        public GiftReference GetGiftReference(Guid guid)
        {
            return GiftReferences.Where(gr => gr.Guid == guid)
                                .Include(gr => gr.Owner)
                                .Include(gr => gr.Sender)
                                .Include(gr => gr.Gift)
                                .FirstOrDefault();
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
            return Tags.Where(t => t.Name.ToUpper() == name.ToUpper())
                .Include(g => g.GiftTags)
                .ThenInclude(gt => gt.Gift)
                .ThenInclude(g => g.StaticUrls)
                .Include(g => g.GiftTags)
                .ThenInclude(gt => gt.Gift)
                .ThenInclude(g => g.GiftTags)
                .ThenInclude(gt => gt.Tag)
                .FirstOrDefault();
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
            SaveChanges();
        }

        //  TODO: вынести тестовое заполнение.
        public void TestCreateGiftsTags()
        {
            Clear();


            var gifts = Enumerable.Range(0, 10).Select(i => $"gift_{i}").Select(n => new Gift
            {
                Name = n,
                CatalogStatic = $"{n}/",
                StaticUrls = new List<StaticUrl>
                {
                    new StaticUrl($"{n}/1.png"),
                    new StaticUrl($"{n}/2.png"),
                },
                ModelUrl = $"{n}/model.obj",
                Description = $"Awesome n",
            });
            Gifts.AddRange(gifts);
            SaveChanges();
            
            var tags = new[] {"Christmas", "New Year", "Birthday", "Anniversary", "Kids", "Women", "Men"};
            Tags.AddRange(tags.Select(t => new Tag(t)));
            SaveChanges();
            
            var i = 0;
            var list = new List<Tag>(Tags);
            foreach (var gift in Gifts)
            {
                IEnumerable<GiftTag> giftTags = new List<GiftTag>();
                if (i <= 4)
                {
                    giftTags = list.GetRange(i, 3).Select(t => new GiftTag
                    {
                        Gift = gift,
                        Tag = t,
                    });
                }
                else if (i == 5)
                {
                    
                    giftTags = list.GetRange(5, 2).Select(t => new GiftTag
                    {
                        Gift = gift,
                        Tag = t,
                    });
                }
                else if (i == 6)
                {
                    
                    giftTags = list.GetRange(6, 1).Select(t => new GiftTag
                    {
                        Gift = gift,
                        Tag = t,
                    });
                }

                GiftTags.AddRange(giftTags);
                i = ++i % 7;
            }
            SaveChanges();
        }
    }
}