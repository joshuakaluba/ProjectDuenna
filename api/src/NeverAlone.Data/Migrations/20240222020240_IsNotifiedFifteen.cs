using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NeverAlone.Data.Migrations
{
    public partial class IsNotifiedFifteen : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsNotifiedFifteenMinutes",
                table: "UserMonitors",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsNotifiedFifteenMinutes",
                table: "UserMonitors");
        }
    }
}
