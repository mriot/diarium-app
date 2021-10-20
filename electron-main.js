const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

require('electron-reload')(__dirname);

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      devTools: process.env.ROLLUP_WATCH
    }
  });
  
  mainWindow.loadFile(path.join(__dirname, "public/index.html"));
  mainWindow.webContents.openDevTools();
})

ipcMain.handle("test-me", async (event, args) => {
  const result = await dialog.showOpenDialog(mainWindow, {title: "asdf"})
  console.log(result);
  return result
})
