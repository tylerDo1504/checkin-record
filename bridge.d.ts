import { RecordModel } from "./src/ui/models";

export interface IElectronAPI {
  getData: () => Promise<RecordModel[]>;
  getAllTable: () => Promise<any>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
