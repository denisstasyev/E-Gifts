﻿// <auto-generated />
using System;
using EGifts.DataBase;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace EGifts.Migrations
{
    [DbContext(typeof(MainDbContext))]
    [Migration("20191208121021_RenameField")]
    partial class RenameField
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("EGifts.DataBase.DatabaseClasses.Gift", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("CatalogStatic")
                        .HasColumnType("text");

                    b.Property<double>("Cost")
                        .HasColumnType("double precision");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("DonationOrganisation")
                        .HasColumnType("text");

                    b.Property<int>("DonationPercent")
                        .HasColumnType("integer");

                    b.Property<int>("Light")
                        .HasColumnType("integer");

                    b.Property<string>("ModelUrl")
                        .HasColumnType("text");

                    b.Property<string>("ModelUrlApple")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<long>("PurchasesCount")
                        .HasColumnType("bigint");

                    b.Property<float>("ScaleX")
                        .HasColumnType("real");

                    b.Property<float>("ScaleY")
                        .HasColumnType("real");

                    b.Property<float>("ScaleZ")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.ToTable("Gifts");
                });

            modelBuilder.Entity("EGifts.DataBase.DatabaseClasses.GiftReference", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<long?>("GiftId")
                        .HasColumnType("bigint");

                    b.Property<Guid>("Guid")
                        .HasColumnType("uuid");

                    b.Property<long?>("OwnerId")
                        .HasColumnType("bigint");

                    b.Property<string>("Reference")
                        .HasColumnType("text");

                    b.Property<long?>("SenderId")
                        .HasColumnType("bigint");

                    b.Property<string>("Text")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("GiftId");

                    b.HasIndex("OwnerId");

                    b.HasIndex("SenderId");

                    b.ToTable("GiftReferences");
                });

            modelBuilder.Entity("EGifts.DataBase.DatabaseClasses.GiftTag", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<long?>("GiftId")
                        .HasColumnType("bigint");

                    b.Property<long?>("TagId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("GiftId");

                    b.HasIndex("TagId");

                    b.ToTable("GiftTags");
                });

            modelBuilder.Entity("EGifts.DataBase.DatabaseClasses.Payment", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<long?>("GiftId")
                        .HasColumnType("bigint");

                    b.Property<long?>("GiftReceiverId")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("PaymentTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<bool>("Self")
                        .HasColumnType("boolean");

                    b.Property<long?>("UserId")
                        .HasColumnType("bigint");

                    b.Property<double>("Value")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.HasIndex("GiftId");

                    b.HasIndex("GiftReceiverId");

                    b.HasIndex("UserId");

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("EGifts.DataBase.DatabaseClasses.Role", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("Permissions")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("EGifts.DataBase.DatabaseClasses.Session", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime?>("Begin")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime?>("End")
                        .HasColumnType("timestamp without time zone");

                    b.Property<long?>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Sessions");
                });

            modelBuilder.Entity("EGifts.DataBase.DatabaseClasses.StaticUrl", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<long?>("GiftId")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("GiftId");

                    b.ToTable("StaticUrls");
                });

            modelBuilder.Entity("EGifts.DataBase.DatabaseClasses.Tag", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<long>("Count")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("EGifts.DataBase.DatabaseClasses.Token", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<Guid>("Guid")
                        .HasColumnType("uuid");

                    b.Property<string>("UserAgent")
                        .HasColumnType("text");

                    b.Property<long?>("UserId")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("ValidThru")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Tokens");
                });

            modelBuilder.Entity("EGifts.DataBase.DatabaseClasses.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime?>("BirthDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<string>("Mail")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("bytea");

                    b.Property<DateTime?>("RegistrationDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<long?>("RoleId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("EGifts.DataBase.DatabaseClasses.UserGift", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<long?>("GiftId")
                        .HasColumnType("bigint");

                    b.Property<bool>("Self")
                        .HasColumnType("boolean");

                    b.Property<long?>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("GiftId");

                    b.HasIndex("UserId");

                    b.ToTable("UserGifts");
                });

            modelBuilder.Entity("EGifts.DataBase.DatabaseClasses.GiftReference", b =>
                {
                    b.HasOne("EGifts.DataBase.DatabaseClasses.Gift", "Gift")
                        .WithMany()
                        .HasForeignKey("GiftId");

                    b.HasOne("EGifts.DataBase.DatabaseClasses.User", "Owner")
                        .WithMany("ReceivedGifts")
                        .HasForeignKey("OwnerId");

                    b.HasOne("EGifts.DataBase.DatabaseClasses.User", "Sender")
                        .WithMany("SentGifts")
                        .HasForeignKey("SenderId");
                });

            modelBuilder.Entity("EGifts.DataBase.DatabaseClasses.GiftTag", b =>
                {
                    b.HasOne("EGifts.DataBase.DatabaseClasses.Gift", "Gift")
                        .WithMany("GiftTags")
                        .HasForeignKey("GiftId");

                    b.HasOne("EGifts.DataBase.DatabaseClasses.Tag", "Tag")
                        .WithMany("GiftTags")
                        .HasForeignKey("TagId");
                });

            modelBuilder.Entity("EGifts.DataBase.DatabaseClasses.Payment", b =>
                {
                    b.HasOne("EGifts.DataBase.DatabaseClasses.Gift", "Gift")
                        .WithMany()
                        .HasForeignKey("GiftId");

                    b.HasOne("EGifts.DataBase.DatabaseClasses.User", "GiftReceiver")
                        .WithMany()
                        .HasForeignKey("GiftReceiverId");

                    b.HasOne("EGifts.DataBase.DatabaseClasses.User", "User")
                        .WithMany("Payments")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("EGifts.DataBase.DatabaseClasses.Session", b =>
                {
                    b.HasOne("EGifts.DataBase.DatabaseClasses.User", "User")
                        .WithMany("Sessions")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("EGifts.DataBase.DatabaseClasses.StaticUrl", b =>
                {
                    b.HasOne("EGifts.DataBase.DatabaseClasses.Gift", null)
                        .WithMany("StaticUrls")
                        .HasForeignKey("GiftId");
                });

            modelBuilder.Entity("EGifts.DataBase.DatabaseClasses.Token", b =>
                {
                    b.HasOne("EGifts.DataBase.DatabaseClasses.User", "User")
                        .WithMany("Tokens")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("EGifts.DataBase.DatabaseClasses.User", b =>
                {
                    b.HasOne("EGifts.DataBase.DatabaseClasses.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId");
                });

            modelBuilder.Entity("EGifts.DataBase.DatabaseClasses.UserGift", b =>
                {
                    b.HasOne("EGifts.DataBase.DatabaseClasses.Gift", "Gift")
                        .WithMany("UserGifts")
                        .HasForeignKey("GiftId");

                    b.HasOne("EGifts.DataBase.DatabaseClasses.User", "User")
                        .WithMany("UserGifts")
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
