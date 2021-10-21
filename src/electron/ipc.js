const { ipcMain, dialog } = require("electron");

module.exports = ({ config, browserWindow }) => {
  ipcMain.handle("get-config", async (event, args) => {
    return await config.get();
  });

  ipcMain.handle("db-picker", async (event, args) => {
    const result = await dialog.showOpenDialog(browserWindow, {
      filters: [
        {
          // name: "diarium",
          // extensions: ["sqlite"]
        }
      ],
      multiSelections: false,
      openDirectory: false,
      message: "Select your DIARIUM database"
    });

    if (!result.canceled) {
      await config.write("dbPath", result.filePaths[0]);
      return result;
    }
    return false;
  });
};
