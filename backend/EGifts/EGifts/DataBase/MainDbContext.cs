using System;
using System.Collections.Generic;
using System.Linq;
using EGifts.DataBase.DatabaseClasses;
using Microsoft.AspNetCore.Routing;
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
                .WithMany(u => u.ReceivedGifts);
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
        
        public User GetUser(string name, byte[] password)
        {
            return Users.Where(u => u.Name.ToLower() == name.ToLower() &&
                                    u.PasswordHash.SequenceEqual(password))
                        .Include(u => u.SentGifts)
                            .ThenInclude(gr => gr.Gift)
                                .ThenInclude(g => g.StaticUrls)
                        .Include(u => u.ReceivedGifts)
                            .ThenInclude(gr => gr.Gift)
                                .ThenInclude(g => g.StaticUrls)
                        .Include(u => u.SentGifts)
                            .ThenInclude(gr => gr.Gift)
                                .ThenInclude(g => g.GiftTags)
                                    .ThenInclude(gt => gt.Tag)
                        .Include(u => u.ReceivedGifts)
                            .ThenInclude(gr => gr.Gift)
                                .ThenInclude(g => g.GiftTags)
                                    .ThenInclude(gt => gt.Tag)
                        .FirstOrDefault();
        }
        public User GetUser(User user)
        {
            return Users.Where(u => u.Id == user.Id)
                        .Include(u => u.SentGifts)
                            .ThenInclude(gr => gr.Gift)
                                .ThenInclude(g => g.StaticUrls)
                        .Include(u => u.ReceivedGifts)
                            .ThenInclude(gr => gr.Gift)
                                .ThenInclude(g => g.StaticUrls)
                        .Include(u => u.SentGifts)
                            .ThenInclude(gr => gr.Gift)
                                .ThenInclude(g => g.GiftTags)
                                    .ThenInclude(gt => gt.Tag)
                        .Include(u => u.ReceivedGifts)
                            .ThenInclude(gr => gr.Gift)
                                .ThenInclude(g => g.GiftTags)
                                    .ThenInclude(gt => gt.Tag)
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

        public Token GetToken(Guid guid)
        {
            return Tokens.Where(t => t.Guid == guid)
                            .Include(t => t.User)
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

        
        public void TestCreateGiftsTags1()
        {
            Clear();
            
            var tags = new[] {"Christmas", "New Year", "Birthday", "Anniversary", "Kids", "Women", "Men"};
            Tags.AddRange(tags.Select(t => new Tag(t)));
            SaveChanges();

            const string modelUrl1 = "/model/bee.glb";
            const string modelUrl2 = "/model/bee.usdz";
            const string imagesFolder = "/images/";
            const string giftAl = "alchemist_fantasy_house";
            var gift = new Gift
            {
                Name = "Fantastic Bee",
                Description = "Really Awesome Bee!",
                ScaleX = 0.005f,
                ScaleY = 0.005f,
                ScaleZ = 0.005f,
                Light = 20,
                ModelUrl = $"{giftAl}{modelUrl1}",
                ModelUrlApple = $"{giftAl}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                        Enumerable.Range(1, 4).Select(n => new StaticUrl($"{giftAl}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            var tagList = new[] { "Men", "Women", "Kids", "Birthday", "Anniversary"};
            var giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            const string giftCt = "christmas_tree";
            gift = new Gift
            {
                Name = "Christmas tree",
                Description = "The perfect E-Gift for New Year and Christmas, which will always be near the recipient",
                ScaleX = 0.01f,
                ScaleY = 0.007f,
                ScaleZ = 0.01f,
                Light = 6,
                ModelUrl = $"{giftCt}{modelUrl1}",
                ModelUrlApple = $"{giftCt}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 3).Select(n => new StaticUrl($"{giftCt}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Men", "Women", "New Year", "Christmas"};
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            const string giftFh = "forest_house";
            gift = new Gift
            {
                Name = "Forest House",
                Description = "This E-Gift is for children who dream of a fabulous house in the forest",
                ScaleX = 0.3f,
                ScaleY = 0.3f,
                ScaleZ = 0.3f,
                Light = 7,
                ModelUrl = $"{giftFh}{modelUrl1}",
                ModelUrlApple = $"{giftFh}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 3).Select(n => new StaticUrl($"{giftFh}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Kids", "Birthday" };
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            const string giftGoogle = "google";
            gift = new Gift
            {
                Name = "Google",
                Description = "This E-Gift suits most of all for Google fans",
                ScaleX = 0.6f,
                ScaleY = 0.6f,
                ScaleZ = 0.6f,
                Light = 6,
                CreationDate = DateTime.Now,
                ModelUrl = $"{giftGoogle}{modelUrl1}",
                ModelUrlApple = $"{giftGoogle}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 2).Select(n => new StaticUrl($"{giftGoogle}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Men", "Women","Birthday" };
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            const string giftGf = "guppy_fish";
            gift = new Gift
            {
                Name = "Guppy fish",
                Description = "Does your friend often leave home for a long time and therefore cannot feed aquarium fish? If yes, then this guppy living in a virtual world will be a great gift",
                ScaleX = 0.7f,
                ScaleY = 0.7f,
                ScaleZ = 0.7f,
                Light = 10,
                ModelUrl = $"{giftGf}{modelUrl1}",
                ModelUrlApple = $"{giftGf}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 4).Select(n => new StaticUrl($"{giftGf}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Women", "Kids", "Birthday" };
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            const string giftOcc = "old_cartoon_car";
            gift = new Gift
            {
                Name = "Old cartoon car",
                Description = "This old car can be a great gift for both boys and adult men who are interested in cars, racing or auto-modeling",
                ScaleX = 0.005f,
                ScaleY = 0.005f,
                ScaleZ = 0.005f,
                Light = 50,
                ModelUrl = $"{giftOcc}{modelUrl1}",
                ModelUrlApple = $"{giftOcc}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 3).Select(n => new StaticUrl($"{giftOcc}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Men", "Kids", "Birthday"};
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            const string giftT = "trailer";
            gift = new Gift
            {
                Name = "Trailer",
                Description = "All you need for the happiness of your friend in one E-Gift",
                ScaleX = 0.03f,
                ScaleY = 0.03f,
                ScaleZ = 0.03f,
                Light = 100,
                ModelUrl = $"{giftT}{modelUrl1}",
                CreationDate = DateTime.Now,
                ModelUrlApple = $"{giftT}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 4).Select(n => new StaticUrl($"{giftT}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Men", "Birthday", "Anniversary"};
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
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