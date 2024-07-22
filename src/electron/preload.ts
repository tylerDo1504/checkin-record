// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { IPC_KEY_HANDLER } from "../constants";

contextBridge.exposeInMainWorld("electronAPI", {
  getData: async () => await ipcRenderer.invoke(IPC_KEY_HANDLER.GET_DATA),
  getAllTable: async () =>
    await ipcRenderer.invoke(IPC_KEY_HANDLER.GET_ALL_TABLES),
});
