import {
  App as AntdApp,
  Badge,
  Button,
  ConfigProvider,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { CONFIG_COLUMNS, RECORD_KEY } from "./constants";
import { RecordModel } from "./models";

export function App() {
  const [data, setData] = useState<RecordModel[]>([]);
  const [count, setCount] = useState(0);

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

  const onHandleCount = (count: number) => {
    setCount(count);
  };

  useEffect(() => {
    const intervalCountUpdate = setInterval(async () => {
      const internalCount = await window.electronAPI.getCount();
      onHandleCount(internalCount);
    }, 5000);

    return () => {
      clearInterval(intervalCountUpdate);
      window.electronAPI.removeCounter();
    };
  }, []);

  return (
    <ConfigProvider>
      <AntdApp>
        <div className="w-full flex flex-col space-y-4 p-16">
          <div className="flex justify-between">
            <Button onClick={onClickButton}>Load Data</Button>
            <Badge count={count} className="p-2">
              <Typography>Tick</Typography>
            </Badge>
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
