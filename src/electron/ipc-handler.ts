import { ipcMain } from "electron";
import { IPC_KEY_HANDLER } from "../constants/index";
import {
  getAllData,
  getAllTables,
  initializeDatabase,
} from "../utils/database";

ipcMain.handle(IPC_KEY_HANDLER.INITIALIZE_DATABASE, async () => {
  return await initializeDatabase();
});

ipcMain.handle(IPC_KEY_HANDLER.GET_DATA, () => {
  return getAllData();
});

ipcMain.handle(IPC_KEY_HANDLER.GET_ALL_TABLES, () => {
  return getAllTables();
});
