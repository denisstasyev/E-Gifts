using Microsoft.EntityFrameworkCore.Migrations;

namespace EGifts.Migrations
{
    public partial class StaticCatalogName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CatalogStatic",
                table: "Gifts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModelUrl",
                table: "Gifts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CatalogStatic",
                table: "Gifts");

            migrationBuilder.DropColumn(
                name: "ModelUrl",
                table: "Gifts");
        }
    }
}
