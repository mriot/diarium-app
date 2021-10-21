const { ipcMain, dialog } = require("electron");

module.exports = ({ config, browserWindow }) => {
  ipcMain.handle("get-config", async (event, args) => {
    const settings = await config.get();
    return settings;
  });

  ipcMain.handle("db-picker", async (event, args) => {
    const result = await dialog.showOpenDialog(browserWindow, {
      filters: [
        {
          name: "diarium",
          extensions: ["sqlite"]
        }
      ],
      multiSelections: false,
      openDirectory: false,
      message: "Select your DIARIUM database"
    });

    console.log(result);
    return result;
  });
};
