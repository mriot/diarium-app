const { ipcMain, dialog, app } = require("electron");
const path = require("path");
const { mkdir, stat } = require("fs/promises");
const db = require("./db-manager");

module.exports = (config, browserWindow) => {
  // GET CONFIG
  ipcMain.handle("get-config", async (event, args) => {
    return await config.get(args);
  });

  // SELECT DIARIUM LOCATION
  ipcMain.handle("db-picker", async (event, args) => {
    const result = await dialog.showOpenDialog(browserWindow, {
      defaultPath: app.getPath("desktop"),
      properties: ["openDirectory"],
      multiSelections: false,
      message: "Select your DIARIUM folder",
    });

    if (!result.canceled) {
      try {
        await stat(path.join(result.filePaths[0], "diarium.db"));
      } catch (error) {
        dialog.showMessageBox(browserWindow, {
          message: "Ooops, couldn't find the database!\n\nPlease make sure you have selected the right location.",
          type: "error",
        });
        return false;
      }

      await config.write("dbPath", result.filePaths[0]);
      return result;
    }
    return false;
  });

  // CREATE DIARIUM LOCATION
  ipcMain.handle("create-diarium", async (events, args) => {
    const result = await dialog.showOpenDialog(browserWindow, {
      defaultPath: app.getPath("desktop"),
      properties: ["openDirectory"],
      multiSelections: false,
      message: "Pick the location for your DIARIUM folder",
    });

    if (result.canceled) {
      return false;
    }

    const diariumPath = path.join(result.filePaths[0], "diarium");

    // create folder "diarium"
    try {
      await mkdir(diariumPath);
    } catch (error) {
      const message =
        error.code == "EEXIST"
          ? `Oops there is already a folder named "diarium"`
          : `Something went wrong :/ \n\nError: ${error.code}`;
      dialog.showMessageBox(browserWindow, { message, type: "error" });
      return false;
    }

    // create folder "diarium/media"
    try {
      await mkdir(path.join(diariumPath, "media"));
    } catch (error) {
      dialog.showMessageBox(browserWindow, {
        message: `Something went wrong while creating "media" folder :/\n\nError: ${error.code}`,
        type: "error",
      });
      return false;
    }

    db.init(diariumPath);
    db.createDb();

    await config.write("dbPath", diariumPath);

    dialog.showMessageBox(browserWindow, { message: `Done!`, type: "info" });

    return diariumPath;
  });

  // SECRET
  ipcMain.handle("set-secret", (event, args) => {
    global.SECRET = args;
    // db.createMockData();
  });

  // ADD RECORD
  ipcMain.handle("add-record", (event, args) => {
    return db.addRecord(args);
  });

  // GET ALL RECORDS
  ipcMain.handle("get-all-records", (event, args) => {
    return db.getAllRecords();
  });

  // GET RECORD
  ipcMain.handle("get-record", (event, args) => {
    return db.getRecord(args);
  });

  // UPDATE RECORD
  ipcMain.handle("update-record", (event, args) => {
    return db.updateRecord(args);
  });

  // DELETE RECORD
  ipcMain.handle("delete-record", (event, args) => {
    return db.deleteRecord(args);
  });

  // SEARCH
  ipcMain.handle("search", (event, args) => {
    return db.search(args);
  });
};
