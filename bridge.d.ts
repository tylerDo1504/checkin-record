import { RecordModel } from "./src/ui/models";

export interface IElectronAPI {
  getData: () => Promise<RecordModel[]>;
  getAllTable: () => Promise<any>;
  getCount: () => Promise<number>;
  onCountUpdate: (callback: (count: number) => void) => void;
  removeCounter: () => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
