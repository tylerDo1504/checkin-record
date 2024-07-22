import { ConfigProvider, App as AntdApp, Button, Table } from "antd";
import { CONFIG_COLUMNS, RECORD_KEY } from "./constants";
import { useState } from "react";
import { RecordModel } from "./models";

export function App() {
  const [data, setData] = useState<RecordModel[]>([]);

  const onClickButton = async () => {
    const loadData = await window.electronAPI.getData();

    const addIndexToData = loadData.map((item, index) => {
      return {
        ...item,
        id: index + 1,
      };
    });

    setData(addIndexToData);
  };

  return (
    <ConfigProvider>
      <AntdApp>
        <div className="w-full flex flex-col space-y-4 p-16">
          <div>
            <Button onClick={onClickButton}>Load Data</Button>
          </div>
          <Table
            rowKey={RECORD_KEY.ID}
            columns={CONFIG_COLUMNS}
            dataSource={data}
          />
        </div>
      </AntdApp>
    </ConfigProvider>
  );
}
