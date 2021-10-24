const { app, BrowserWindow, shell } = require("electron");
const path = require("path");
const config = require("./config-manager");
const db = require("./db-manager");

// DEV: hard reload electron stuff
process.env.ROLLUP_WATCH &&
  require("electron-reload")(path.join(__dirname, "./"), {
    electron: path.join(__dirname, "../../", "node_modules", ".bin", "electron"),
    forceHardReset: true
  });

// DEV: soft reload frontend
process.env.ROLLUP_WATCH && require("electron-reload")(path.join(__dirname, "../../"));

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

  const dbPath = await config.get("dbPath");
  if (dbPath) db.init(dbPath);
  require("./ipc")({ config, mainWindow });

  mainWindow.loadFile(path.join(__dirname, "../../public/index.html"));
  process.env.ROLLUP_WATCH && mainWindow.webContents.openDevTools();

  mainWindow.webContents.on("will-navigate", handleRedirect);
  mainWindow.webContents.on("new-window", handleRedirect);
});

// don't open links in electron
const handleRedirect = (event, url) => {
  if (url != mainWindow.webContents.getURL()) {
    event.preventDefault();
    shell.openExternal(url);
  }
};
