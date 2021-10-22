// init DB
// GET records
// WRITE records
// UPDATE records

const { dialog } = require("electron");
const path = require("path");

module.exports = {
  knex: null,

  init(diariumPath) {
    try {
      this.knex = require("knex")({
        client: "sqlite3",
        connection: {
          filename: path.join(diariumPath, "diarium.db")
        },
        useNullAsDefault: true,
        debug: false
      });
    } catch (error) {
      console.log(error);
    }
  },

  async createDb() {
    try {
      await this.knex.schema.createTable("records", function (table) {
        table.increments();
        table.text("content", "MEDIUMTEXT");
        table.timestamps();
      });
    } catch (error) {
      dialog.showMessageBox(null, { message: `Could not create database\n\n${error}`, type: "error" });
    }
  }
};
