using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EGifts.Migrations
{
    public partial class PurchasesNumber : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RegistrarionDate",
                table: "Users");

            migrationBuilder.AddColumn<DateTime>(
                name: "RegistrationDate",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "PurchasesNumber",
                table: "Gifts",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RegistrationDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PurchasesNumber",
                table: "Gifts");

            migrationBuilder.AddColumn<DateTime>(
                name: "RegistrarionDate",
                table: "Users",
                type: "timestamp without time zone",
                nullable: true);
        }
    }
}
