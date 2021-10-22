// init DB
// GET records
// WRITE records
// UPDATE records
const sqlite3 = require("sqlite3");
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./diarium.db"
  },
  useNullAsDefault: true,
  debug: true
});

module.exports = {
  async createDb() {
    console.log("lol");
    const test = await knex.schema.createTable("users", function (table) {
      table.increments();
      table.string("name");
      table.timestamps();
    });
    console.log(test.sql);
  }
};
