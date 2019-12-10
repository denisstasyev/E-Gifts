using Microsoft.EntityFrameworkCore.Migrations;

namespace EGifts.Migrations
{
    public partial class RenameField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PurchasesNumber",
                table: "Gifts");

            migrationBuilder.AddColumn<long>(
                name: "PurchasesCount",
                table: "Gifts",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PurchasesCount",
                table: "Gifts");

            migrationBuilder.AddColumn<long>(
                name: "PurchasesNumber",
                table: "Gifts",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
