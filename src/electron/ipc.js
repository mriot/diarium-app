const { ipcMain, dialog, app } = require("electron");
const path = require("path");
const { mkdir } = require("fs/promises");
const db = require("./db-manager");

module.exports = ({ config, browserWindow }) => {
  ipcMain.handle("get-config", async (event, args) => {
    return await config.get(args);
  });

  ipcMain.handle("db-picker", async (event, args) => {
    const result = await dialog.showOpenDialog(browserWindow, {
      defaultPath: app.getPath("desktop"),
      properties: ["openDirectory"],
      multiSelections: false,
      message: "Select your DIARIUM folder"
    });

    if (!result.canceled) {
      await config.write("dbPath", result.filePaths[0]);
      return result;
    }
    return false;
  });

  ipcMain.handle("create-diarium", async (events, args) => {
    // let user pick location
    const result = await dialog.showOpenDialog(browserWindow, {
      defaultPath: app.getPath("desktop"),
      properties: ["openDirectory"],
      multiSelections: false,
      message: "Pick the location for your DIARIUM folder"
    });

    if (result.canceled) {
      return false;
    }

    const diariumPath = path.join(result.filePaths[0], "diarium");

    // create folder "diarium"
    try {
      await mkdir(diariumPath);
    } catch (error) {
      const message = error.code == "EEXIST" ? `Oops there is already a folder named "diarium"` : `Something went wrong :/ \n\nError: ${error.code}`;
      dialog.showMessageBox(browserWindow, { message, type: "error" });
      return false;
    }

    // create folder "diarium/media"
    try {
      await mkdir(path.join(diariumPath, "media"));
    } catch (error) {
      dialog.showMessageBox(browserWindow, {
        message: `Something went wrong while creating "media" folder :/\n\nError: ${error.code}`,
        type: "error"
      });
      return false;
    }

    db.init(diariumPath);
    db.createDb();

    await config.write("dbPath", diariumPath);

    dialog.showMessageBox(browserWindow, { message: `Done!`, type: "info" });

    return diariumPath;
  });
};
