using Microsoft.EntityFrameworkCore.Migrations;

namespace EGifts.Migrations
{
    public partial class GiftScalesAndText : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "ScaleX",
                table: "Gifts",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "ScaleY",
                table: "Gifts",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "ScaleZ",
                table: "Gifts",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "Text",
                table: "GiftReferences",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ScaleX",
                table: "Gifts");

            migrationBuilder.DropColumn(
                name: "ScaleY",
                table: "Gifts");

            migrationBuilder.DropColumn(
                name: "ScaleZ",
                table: "Gifts");

            migrationBuilder.DropColumn(
                name: "Text",
                table: "GiftReferences");
        }
    }
}
