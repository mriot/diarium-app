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
      const settingsString = await readFile(this._configPath, { encoding: "utf-8" });
      const settings = JSON.parse(settingsString);
      return setting ? settings[setting] : settings;
    } catch (error) {
      console.log("settings.get() failed!", error);
    }
  },

  async write(key, value) {
    try {
      const settings = await this.get();
      settings[key] = value;
      writeFile(this._configPath, JSON.stringify(settings));
    } catch (error) {
      console.log("settings.write() failed!", error);
    }
  }
};
