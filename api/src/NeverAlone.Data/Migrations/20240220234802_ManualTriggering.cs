using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NeverAlone.Data.Migrations
{
    public partial class ManualTriggering : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsManuallyTriggered",
                table: "UserMonitors",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeManuallyTriggered",
                table: "UserMonitors",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsManuallyTriggered",
                table: "UserMonitors");

            migrationBuilder.DropColumn(
                name: "TimeManuallyTriggered",
                table: "UserMonitors");
        }
    }
}
