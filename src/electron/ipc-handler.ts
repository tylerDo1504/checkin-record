import { ipcMain } from "electron";
import { IPC_KEY_HANDLER } from "../constants/index";
import { CountManager } from "../utils/count";
import {
  getAllData,
  getAllTables,
  initializeDatabase,
} from "../utils/database";

const countManager = CountManager.getInstance();

ipcMain.handle(IPC_KEY_HANDLER.INITIALIZE_DATABASE, async () => {
  return await initializeDatabase();
});

ipcMain.handle(IPC_KEY_HANDLER.GET_DATA, () => {
  return getAllData();
});

ipcMain.handle(IPC_KEY_HANDLER.GET_ALL_TABLES, () => {
  return getAllTables();
});

ipcMain.handle(IPC_KEY_HANDLER.COUNT_UPDATED, () => {
  return countManager.getCount();
});

ipcMain.handle(IPC_KEY_HANDLER.REMOVE_COUNTER, () => {
  return countManager.stopCounting();
});
