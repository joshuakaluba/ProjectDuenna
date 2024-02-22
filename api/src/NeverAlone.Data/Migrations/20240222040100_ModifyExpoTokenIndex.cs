using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NeverAlone.Data.Migrations
{
    public partial class ModifyExpoTokenIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ExpoPushNotificationTokens_ApplicationUserId",
                table: "ExpoPushNotificationTokens");

            migrationBuilder.DropIndex(
                name: "IX_ExpoPushNotificationTokens_Token",
                table: "ExpoPushNotificationTokens");

            migrationBuilder.CreateIndex(
                name: "IX_ExpoPushNotificationTokens_ApplicationUserId_Token",
                table: "ExpoPushNotificationTokens",
                columns: new[] { "ApplicationUserId", "Token" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ExpoPushNotificationTokens_ApplicationUserId_Token",
                table: "ExpoPushNotificationTokens");

            migrationBuilder.CreateIndex(
                name: "IX_ExpoPushNotificationTokens_ApplicationUserId",
                table: "ExpoPushNotificationTokens",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ExpoPushNotificationTokens_Token",
                table: "ExpoPushNotificationTokens",
                column: "Token",
                unique: true);
        }
    }
}
