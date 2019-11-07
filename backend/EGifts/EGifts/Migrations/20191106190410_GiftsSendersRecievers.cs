using Microsoft.EntityFrameworkCore.Migrations;

namespace EGifts.Migrations
{
    public partial class GiftsSendersRecievers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "SenderId",
                table: "GiftReferences",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_GiftReferences_SenderId",
                table: "GiftReferences",
                column: "SenderId");

            migrationBuilder.AddForeignKey(
                name: "FK_GiftReferences_Users_SenderId",
                table: "GiftReferences",
                column: "SenderId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GiftReferences_Users_SenderId",
                table: "GiftReferences");

            migrationBuilder.DropIndex(
                name: "IX_GiftReferences_SenderId",
                table: "GiftReferences");

            migrationBuilder.DropColumn(
                name: "SenderId",
                table: "GiftReferences");
        }
    }
}
