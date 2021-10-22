const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");

contextBridge.exposeInMainWorld("api", {
  getConfig: args => ipcRenderer.invoke("get-config", args),
  selectDb: () => ipcRenderer.invoke("db-picker")
});
