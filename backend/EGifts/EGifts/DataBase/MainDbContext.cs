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
            if (null == user) return null;
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

            const string modelUrl1 = "/scene.glb";
            const string modelUrl2 = "/scene.usdz";
            const string imagesFolder = @"/";
            const string giftAl = "anemone";
            var gift = new Gift
            {
                Name = "Anemone",
                Description = "Cute anemone with cute fish",
                ModelUrl = $"{giftAl}{modelUrl1}",
                ModelUrlApple = $"{giftAl}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                        Enumerable.Range(1, 5).Select(n => new StaticUrl($"{giftAl}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            var tagList = new[] { "Men", "Women", "Kids", "Birthday"};
            var giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            const string giftBee = "bee";
            gift = new Gift
            {
                Name = "Bee",
                Description = "Really Awesome Bee!",
                ModelUrl = $"{giftBee}{modelUrl1}",
                ModelUrlApple = $"{giftBee}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 4).Select(n => new StaticUrl($"{giftBee}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Men", "Women", "Kids", "Birthday"};
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            const string giftButterfly = "butterfly";
            gift = new Gift
            {
                Name = "Butterfly",
                Description = "Really Awesome Butterfly!",
                ModelUrl = $"{giftButterfly}{modelUrl1}",
                ModelUrlApple = $"{giftButterfly}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 3).Select(n => new StaticUrl($"{giftButterfly}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Men", "Women", "Kids", "Anniversary"};
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            
            const string giftCat = "cartoon_cat";
            gift = new Gift
            {
                Name = "Cartoon Cat",
                Description = "Really Awesome Cat!",
                ModelUrl = $"{giftCat}{modelUrl1}",
                ModelUrlApple = $"{giftCat}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 4).Select(n => new StaticUrl($"{giftCat}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Women", "Kids", "Anniversary", "Birthday"};
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            
            const string giftChristmasCarousel = "christmas_carousel";
            gift = new Gift
            {
                Name = "Christmas Carousel",
                Description = "Really Awesome Christmas Carousel",
                ModelUrl = $"{giftChristmasCarousel}{modelUrl1}",
                ModelUrlApple = $"{giftChristmasCarousel}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 4).Select(n => new StaticUrl($"{giftChristmasCarousel}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Women", "Kids",  "New Year", "Christmas"};
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();

            
            const string giftChristmasCover = "christmas_cover";
            gift = new Gift
            {
                Name = "Christmas Cover",
                Description = "Really Awesome ChristmasCover",
                ModelUrl = $"{giftChristmasCover}{modelUrl1}",
                ModelUrlApple = $"{giftChristmasCover}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 3).Select(n => new StaticUrl($"{giftChristmasCover}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Women", "Kids",  "New Year", "Christmas"};
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            const string giftCt = "christmas_tree";
            gift = new Gift
            {
                Name = "Christmas tree",
                Description = "The perfect E-Gift for New Year and Christmas, which will always be near the recipient",
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
            
            
            const string giftCow = "cow";
            gift = new Gift
            {
                Name = "Cow",
                Description = "Really Awesome cow!",
                ModelUrl = $"{giftCow}{modelUrl1}",
                ModelUrlApple = $"{giftCow}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 6).Select(n => new StaticUrl($"{giftCow}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Men", "Women", "Kids", "Anniversary", "Birthday"};
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            
            const string giftCuteDog = "cute_dog";
            gift = new Gift
            {
                Name = "Cute Dog",
                Description = "Really Awesome cow!",
                ModelUrl = $"{giftCuteDog}{modelUrl1}",
                ModelUrlApple = $"{giftCuteDog}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 3).Select(n => new StaticUrl($"{giftCuteDog}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Men", "Women", "Kids", "Anniversary", "Birthday"};
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            const string giftFb = "fantasy_book";
            gift = new Gift
            {
                Name = "Fantasy Book",
                Description = "This E-Gift is for children who dream of a fabulous Fantasy Book",
                ModelUrl = $"{giftFb}{modelUrl1}",
                ModelUrlApple = $"{giftFb}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 4).Select(n => new StaticUrl($"{giftFb}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Kids", "Birthday" };
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            
            const string giftFishsoupPot = "fishsoup_pot";
            gift = new Gift
            {
                Name = "Fishsoup Pot",
                Description = "This E-Gift is for children who dream of a fabulous house in the forest",
                ModelUrl = $"{giftFishsoupPot}{modelUrl1}",
                ModelUrlApple = $"{giftFishsoupPot}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 3).Select(n => new StaticUrl($"{giftFishsoupPot}{imagesFolder}{n}.png")
                    ).Reverse()),
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Kids", "Birthday" };
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            
            const string giftFh = "forest_house";
            gift = new Gift
            {
                Name = "Forest House",
                Description = "This E-Gift is for children who dream of a fabulous house in the forest",
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
            
            const string giftGoogle = "girafe";
            gift = new Gift
            {
                Name = "Giraffe",
                Description = "This E-Gift suits most of all for giraffes fans",
                CreationDate = DateTime.Now,
                ModelUrl = $"{giftGoogle}{modelUrl1}",
                ModelUrlApple = $"{giftGoogle}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 3).Select(n => new StaticUrl($"{giftGoogle}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Men", "Women","Birthday" };
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            const string giftGf = "hero";
            gift = new Gift
            {
                Name = "Hero",
                Description = "A little guy in an alien costume",
                ModelUrl = $"{giftGf}{modelUrl1}",
                ModelUrlApple = $"{giftGf}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 3).Select(n => new StaticUrl($"{giftGf}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Women", "Kids", "Birthday" };
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            const string giftOcc = "juggling_octopus";
            gift = new Gift
            {
                Name = "Juggling Octopus",
                Description = "Really awesome Octopus",
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
            
            const string giftT = "opel_gt";
            gift = new Gift
            {
                Name = "OpelGt",
                Description = "All you need for the happiness of your friend in one E-Gift",
                ModelUrl = $"{giftT}{modelUrl1}",
                CreationDate = DateTime.Now,
                ModelUrlApple = $"{giftT}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 5).Select(n => new StaticUrl($"{giftT}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Men", "Birthday", "Anniversary"};
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            
            const string giftPhoenix = "phoenix";
            gift = new Gift
            {
                Name = "Phoenix",
                Description = "Mb the last x-men move was not good enough. But this phoenix is beautiful",
                ModelUrl = $"{giftPhoenix}{modelUrl1}",
                CreationDate = DateTime.Now,
                ModelUrlApple = $"{giftPhoenix}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 5).Select(n => new StaticUrl($"{giftPhoenix}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Men", "Kids", "Birthday", "Anniversary"};
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            
            const string giftSh = "spinning_heart";
            gift = new Gift
            {
                Name = "Spinning Heart",
                Description = "Listen to ur heaaart, when its calling 4 u... And by this gift :)",
                ModelUrl = $"{giftSh}{modelUrl1}",
                CreationDate = DateTime.Now,
                ModelUrlApple = $"{giftSh}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 2).Select(n => new StaticUrl($"{giftSh}{imagesFolder}{n}.png")
                    ).Reverse()),
                
            };
            Gifts.Add(gift);
            SaveChanges();
            tagList = new[] { "Men", "Women","Birthday", "Anniversary"};
            giftTags = Tags.Where(t => tagList.Contains(t.Name)).Select(t => new GiftTag {Gift = gift, Tag = t});
            GiftTags.AddRange(giftTags);
            SaveChanges();
            
            const string giftTesla = "tesla_cybertruck";
            gift = new Gift
            {
                Name = "TeslaCybertruck",
                Description = "So, now waiting 4 zombie apocalypse",
                ModelUrl = $"{giftTesla}{modelUrl1}",
                CreationDate = DateTime.Now,
                ModelUrlApple = $"{giftTesla}{modelUrl2}",
                StaticUrls = new List<StaticUrl>(
                    Enumerable.Range(1, 3).Select(n => new StaticUrl($"{giftTesla}{imagesFolder}{n}.png")
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