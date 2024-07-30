import { TableColumnProps } from "antd";
import { RecordModel } from "../models";

export * from "./path";

export const RECORD_KEY = {
  ID: "id",
  USERNAME: "username",
  DATE: "date",
  TYPE: "type",
} as const;

export const CONFIG_COLUMNS: TableColumnProps<RecordModel>[] = [
  {
    key: RECORD_KEY.ID,
    dataIndex: RECORD_KEY.ID,
    title: "#",
  },
  {
    key: RECORD_KEY.USERNAME,
    dataIndex: RECORD_KEY.USERNAME,
    title: "Username",
  },
  {
    key: RECORD_KEY.TYPE,
    dataIndex: RECORD_KEY.TYPE,
    title: "Record Type",
  },
  {
    key: RECORD_KEY.DATE,
    dataIndex: RECORD_KEY.DATE,
    title: "Date",
  },
];
