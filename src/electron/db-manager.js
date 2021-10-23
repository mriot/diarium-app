// init DB
// GET records
// WRITE records
// UPDATE records

const { dialog } = require("electron");
const path = require("path");
const AES = require("crypto-js/aes");

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
        debug: true
      });
    } catch (error) {
      dialog.showMessageBox(null, { message: `Could not init database\n\n${error}`, type: "error" });
    }
  },

  async createDb() {
    try {
      await this.knex.schema.createTable("records", function (table) {
        table.increments();
        table.date("date");
        table.text("content", "MEDIUMTEXT");
        table.text("tags");
        table.timestamps();
      });
    } catch (error) {
      dialog.showMessageBox(null, { message: `Could not create database\n\n${error}`, type: "error" });
    }
  },

  async addRecord(record) {
    try {
      await this.knex("records").insert({
        ...record,
        content: AES.encrypt(record.content, global.SECRET)
      });
      return true;
    } catch (error) {
      dialog.showMessageBox(null, { message: `Could not write to database\n\n${error}`, type: "error" });
    }
  },

  async getRecordById(id) {
    try {
      const result = await this.knex.select("*").from("records").where("id", id);
      console.log("outputty:", result);
      // console.log("outputty:", AES.decrypt(result[0].content, global.SECRET));
    } catch (error) {
      dialog.showMessageBox(null, { message: `Could not read from database\n\n${error}`, type: "error" });
    }
  }
};
