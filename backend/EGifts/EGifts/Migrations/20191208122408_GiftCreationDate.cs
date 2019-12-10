using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EGifts.Migrations
{
    public partial class GiftCreationDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Gifts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Gifts");
        }
    }
}
