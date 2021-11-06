const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getConfig: (args) => ipcRenderer.invoke("get-config", args),
  selectDb: () => ipcRenderer.invoke("db-picker"),
  createDiarium: () => ipcRenderer.invoke("create-diarium"),
  setSecret: (secret) => ipcRenderer.invoke("set-secret", secret),
  addRecord: (record) => ipcRenderer.invoke("add-record", record),
  updateRecord: (record) => ipcRenderer.invoke("update-record", record),
  getAllRecords: () => ipcRenderer.invoke("get-all-records"),
  getRecord: (args) => ipcRenderer.invoke("get-record", args),
  deleteRecord: (id) => ipcRenderer.invoke("delete-record", id),
  search: (string) => ipcRenderer.invoke("search", string),
});
