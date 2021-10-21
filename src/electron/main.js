const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const config = require("./config-handler");

process.env.ROLLUP_WATCH && require("electron-reload")(path.join(__dirname, "../"));

config.init();

let mainWindow = null;

app.whenReady().then(async () => {
  const { screen } = require("electron");

  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
      // devTools: process.env.ROLLUP_WATCH
    }
  });

  mainWindow.loadFile(path.join(__dirname, "../../public/index.html"));
  process.env.ROLLUP_WATCH && mainWindow.webContents.openDevTools();
});

ipcMain.handle("get-config", async (event, args) => {
  const settings = await config.get();
  return settings;
  // const result = await dialog.showOpenDialog(mainWindow, { title: "asdf" });
  // console.log(result);
  // return result;
});
