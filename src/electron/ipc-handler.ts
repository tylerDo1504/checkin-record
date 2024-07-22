import { ipcMain, app } from "electron";
import {
  getAllData,
  getAllTables,
  initializeDatabase,
} from "../utils/database";
import * as path from "path";
import { IPC_KEY_HANDLER } from "../constants/index";

export const DATABASE_FILE = path.join(app.getPath("userData"), "app.db");
ipcMain.handle(IPC_KEY_HANDLER.INITIALIZE_DATABASE, async () => {
  return await initializeDatabase();
});

ipcMain.handle(IPC_KEY_HANDLER.GET_DATA, () => {
  return getAllData();
});

ipcMain.handle(IPC_KEY_HANDLER.GET_ALL_TABLES, () => {
  return getAllTables();
});
