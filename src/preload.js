// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

// Expose specific Electron APIs to the renderer process
contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args), // For async messages
    send: (channel, ...args) => ipcRenderer.send(channel, ...args), // For fire-and-forget
    on: (channel, listener) => ipcRenderer.on(channel, listener), // For listening to events
    removeListener: (channel, listener) =>
      ipcRenderer.removeListener(channel, listener),
  },
});
