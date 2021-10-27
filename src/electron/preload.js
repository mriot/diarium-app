const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getConfig: (args) => ipcRenderer.invoke("get-config", args),
  selectDb: () => ipcRenderer.invoke("db-picker"),
  createDiarium: () => ipcRenderer.invoke("create-diarium"),
  secret: (secret) => ipcRenderer.invoke("secret", secret),
  addRecord: (record) => ipcRenderer.invoke("add-record", record),
  getAllRecords: () => ipcRenderer.invoke("get-all-records"),
});
