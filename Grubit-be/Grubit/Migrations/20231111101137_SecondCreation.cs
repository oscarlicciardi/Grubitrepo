using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Grubit.api.Migrations
{
    /// <inheritdoc />
    public partial class SecondCreation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Frequencies_Companies_Id",
                table: "Frequencies");

            migrationBuilder.DropForeignKey(
                name: "FK_Frequencies_Users_Id",
                table: "Frequencies");

            migrationBuilder.DropForeignKey(
                name: "FK_Prizes_Users_Id",
                table: "Prizes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Prizes",
                table: "Prizes");

            migrationBuilder.DropIndex(
                name: "IX_Prizes_Code",
                table: "Prizes");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Prizes",
                newName: "UserId");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Frequencies",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "Frequencies",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Frequencies",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Prizes",
                table: "Prizes",
                column: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Prizes",
                table: "Prizes");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Frequencies");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Frequencies");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Prizes",
                newName: "Id");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Frequencies",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Prizes",
                table: "Prizes",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Prizes_Code",
                table: "Prizes",
                column: "Code",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Frequencies_Companies_Id",
                table: "Frequencies",
                column: "Id",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Frequencies_Users_Id",
                table: "Frequencies",
                column: "Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Prizes_Users_Id",
                table: "Prizes",
                column: "Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
