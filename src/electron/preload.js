const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");

contextBridge.exposeInMainWorld("api", {
  getConfig: () => ipcRenderer.invoke("get-config"),
  selectDb: () => ipcRenderer.invoke("db-picker")
});
