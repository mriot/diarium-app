const { app, BrowserWindow } = require("electron");
const path = require("path");

require('electron-reload')(__dirname);

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 1000
  });
  mainWindow.loadFile(path.join(__dirname, "public/index.html"));
  mainWindow.webContents.openDevTools();
});
