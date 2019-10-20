using Microsoft.EntityFrameworkCore.Migrations;

namespace EGifts.Migrations
{
    public partial class AddStaticUrlsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StaticUrl_Gifts_GiftId",
                table: "StaticUrl");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StaticUrl",
                table: "StaticUrl");

            migrationBuilder.RenameTable(
                name: "StaticUrl",
                newName: "StaticUrls");

            migrationBuilder.RenameIndex(
                name: "IX_StaticUrl_GiftId",
                table: "StaticUrls",
                newName: "IX_StaticUrls_GiftId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StaticUrls",
                table: "StaticUrls",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StaticUrls_Gifts_GiftId",
                table: "StaticUrls",
                column: "GiftId",
                principalTable: "Gifts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StaticUrls_Gifts_GiftId",
                table: "StaticUrls");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StaticUrls",
                table: "StaticUrls");

            migrationBuilder.RenameTable(
                name: "StaticUrls",
                newName: "StaticUrl");

            migrationBuilder.RenameIndex(
                name: "IX_StaticUrls_GiftId",
                table: "StaticUrl",
                newName: "IX_StaticUrl_GiftId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StaticUrl",
                table: "StaticUrl",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StaticUrl_Gifts_GiftId",
                table: "StaticUrl",
                column: "GiftId",
                principalTable: "Gifts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
