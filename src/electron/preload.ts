// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { IPC_KEY_HANDLER } from "../constants";

contextBridge.exposeInMainWorld("electronAPI", {
  getData: async () => await ipcRenderer.invoke(IPC_KEY_HANDLER.GET_DATA),
  getAllTable: async () =>
    await ipcRenderer.invoke(IPC_KEY_HANDLER.GET_ALL_TABLES),
  getCount: async () => await ipcRenderer.invoke(IPC_KEY_HANDLER.COUNT_UPDATED),
  onCountUpdate: (callback: (count: number) => void) => {
    ipcRenderer.on(IPC_KEY_HANDLER.COUNT_UPDATED, (_event, count) => {
      console.log(count, "count de");
      callback(count);
    });
  },
  removeCounter: () => ipcRenderer.invoke(IPC_KEY_HANDLER.REMOVE_COUNTER),
});
