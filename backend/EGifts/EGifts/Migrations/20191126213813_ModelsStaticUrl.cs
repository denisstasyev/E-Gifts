using Microsoft.EntityFrameworkCore.Migrations;

namespace EGifts.Migrations
{
    public partial class ModelsStaticUrl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ModelUrl",
                table: "Gifts");

            migrationBuilder.AddColumn<long>(
                name: "GiftId1",
                table: "StaticUrls",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_StaticUrls_GiftId1",
                table: "StaticUrls",
                column: "GiftId1");

            migrationBuilder.AddForeignKey(
                name: "FK_StaticUrls_Gifts_GiftId1",
                table: "StaticUrls",
                column: "GiftId1",
                principalTable: "Gifts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StaticUrls_Gifts_GiftId1",
                table: "StaticUrls");

            migrationBuilder.DropIndex(
                name: "IX_StaticUrls_GiftId1",
                table: "StaticUrls");

            migrationBuilder.DropColumn(
                name: "GiftId1",
                table: "StaticUrls");

            migrationBuilder.AddColumn<string>(
                name: "ModelUrl",
                table: "Gifts",
                type: "text",
                nullable: true);
        }
    }
}
