const { app } = require("electron");
const path = require("path");
const { readFile, writeFile, stat } = require("fs/promises");

// INIT
module.exports = {
  _configPath: path.join(app.getPath("userData"), "config.json"),

  async init() {
    try {
      await stat(this._configPath);
    } catch (error) {
      writeFile(this._configPath, JSON.stringify({}));
      console.log("Config file created");
    }
  },

  async get(setting) {
    try {
      const configString = await readFile(this._configPath, { encoding: "utf-8" });
      const config = JSON.parse(configString);
      return setting ? config[setting] : config;
    } catch (error) {
      console.log("config.get() failed!", error);
    }
  },

  async write(key, value) {
    try {
      const config = await this.get();
      config[key] = value;
      writeFile(this._configPath, JSON.stringify(config));
    } catch (error) {
      console.log("config.write() failed!", error);
    }
  }
};
