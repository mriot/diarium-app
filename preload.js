const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs');

contextBridge.exposeInMainWorld("api", {
  test: () => ipcRenderer.invoke("test-me")
});
