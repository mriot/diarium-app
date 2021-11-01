const { app, dialog } = require("electron");
const path = require("path");
const { readFile, writeFile, stat } = require("fs/promises");
const { writeFileSync, readFileSync } = require("fs");

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
      writeFile(this._configPath, JSON.stringify({}));
      dialog.showMessageBox(null, {
        message: "Ooops, couldn't read the config file!\n\nFalling back to default config.",
        type: "error"
      });
    }
  },

  async write(key, value) {
    try {
      const config = await this.get();
      config[key] = value;
      writeFile(this._configPath, JSON.stringify(config));
    } catch (error) {
      console.log("config.write() failed!", error);

  getSync(key) {
    try {
      const configString = readFileSync(this._configPath, { encoding: "utf-8" });
      const config = JSON.parse(configString);
      return key ? config[key] : config;
    } catch (error) {
      console.log("config.getSync() failed!", error);
      dialog.showMessageBox(null, {
        message: "Ooops, couldn't read the config file!",
        type: "error",
      });
    }
  },

  writeSync(key, value) {
    try {
      const config = this.getSync();
      config[key] = value;
      writeFileSync(this._configPath, JSON.stringify(config));
    } catch (error) {
      console.log("config.writeSync() failed!", error);
      dialog.showMessageBox(null, {
        message: "Ooops, couldn't write to the config file!",
        type: "error",
      });
    }
  },
};
