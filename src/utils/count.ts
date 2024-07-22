import { ipcMain } from "electron";
import { IPC_KEY_HANDLER } from "../constants";

export class CountManager {
  private static instance: CountManager;
  private count = 0;
  private intervalId: NodeJS.Timeout | null = null;

  private constructor() {
    this.startCounting();
  }

  public static getInstance(): CountManager {
    if (!CountManager.instance) {
      CountManager.instance = new CountManager();
    }
    return CountManager.instance;
  }

  private startCounting() {
    this.intervalId = setInterval(() => {
      this.count++;
      // Emit an event to notify about the count update
      ipcMain.emit(IPC_KEY_HANDLER.COUNT_UPDATED, this.count);
    }, 5000);
  }

  public getCount(): number {
    return this.count;
  }

  public stopCounting() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
