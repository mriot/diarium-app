// init DB
// GET records
// WRITE records
// UPDATE records

const { dialog } = require("electron");
const path = require("path");
const AES = require("crypto-js/aes");
const dayjs = require("dayjs");

module.exports = {
  knex: null,

  init(diariumPath) {
    try {
      this.knex = require("knex")({
        client: "sqlite3",
        connection: {
          filename: path.join(diariumPath, "diarium.db"),
        },
        useNullAsDefault: true,
        debug: true,
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

  async getAllRecords() {
    try {
      return await this.knex.select(["id", "date", "tags"]).from("records");
    } catch (error) {
      dialog.showMessageBox(null, { message: `Could not read from database\n\n${error}`, type: "error" });
    }
  },

  async getRecordsForYear(year) {
    try {
      const parsedDate = dayjs(year, "YYYY");
      return await this.knex
        .select(["id", "date", "tags"])
        .from("records")
        .where("date", ">", parsedDate.format())
        .andWhere("date", "<", parsedDate.add(1, "year").format());
    } catch (error) {
      dialog.showMessageBox(null, { message: `Could not read from database\n\n${error}`, type: "error" });
    }
  },

  async getRecordsForMonthInYear(year, month) {
    try {
      const parsedDate = dayjs([...arguments].join("-"), "YYYY-MM");
      return await this.knex
        .select(["id", "date", "tags"])
        .from("records")
        .where("date", ">", parsedDate.format())
        .andWhere("date", "<", parsedDate.add(1, "month").format());
    } catch (error) {
      dialog.showMessageBox(null, { message: `Could not read from database\n\n${error}`, type: "error" });
    }
  },

  async getRecord(date) {
    try {
      const parsedDate = dayjs(date, "YYYY-MM-DD");
      return await this.knex.select("*").from("records").where("date", parsedDate.format("YYYY-MM-DD")); // explicitly force format
    } catch (error) {
      dialog.showMessageBox(null, { message: `Could not read from database\n\n${error}`, type: "error" });
    }
  },

  async addRecord(record) {
    try {
      await this.knex("records").insert({
        ...record,
        content: AES.encrypt(record.content, global.SECRET),
      });
      return true;
    } catch (error) {
      dialog.showMessageBox(null, { message: `Could not write to database\n\n${error}`, type: "error" });
    }
  },

  async updateRecord(record) {
    try {
      return await this.knex("records").where("id", record.id).update({
        content: record.content,
        tags: record.tags,
      });
    } catch (error) {
      dialog.showMessageBox(null, { message: `Could not update record with id ${id}\n\n${error}`, type: "error" });
    }
  },

  async getRecordById(id) {
    try {
      // TODO: decrypt results
      return await this.knex.select("*").from("records").where("id", id);
      // console.log("outputty:", AES.decrypt(result[0].content, global.SECRET));
    } catch (error) {
      dialog.showMessageBox(null, { message: `Could not read from database\n\n${error}`, type: "error" });
    }
  },

  async createMockData() {
    console.log("CREATING MOCK DATA");
    try {
      for (let i = 0; i < 25; i++) {
        await this.knex("records").insert({
          date: dayjs().add(i, "month").format("YYYY-MM-DD"),
          content: `<h1>Hello World ${i}</h1>`,
          // content: AES.encrypt(`<h1>Hello World ${i}</h1>`, global.SECRET),
          tags: "ja lol ey",
        });
      }
      console.log("DONE");
    } catch (error) {
      dialog.showMessageBox(null, { message: `Could not create mock data\n\n${error}`, type: "error" });
    }
  },
};
