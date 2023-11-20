import { FC, useEffect } from 'react';
import { useStore } from '@/store';
import { observer } from 'mobx-react';
import { Button, Upload, Space, Input } from 'antd';
import { useReactive } from 'ahooks';
import AwaitLock from 'await-lock';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import CustSpin from '@/components/CustSpin/CustSpin';
import './Home.less';

const awaitLock = new AwaitLock();

let count = 0;

const awaitLockDemo = async () => {
  await awaitLock.acquireAsync();
  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        count++;
        resolve(count);
      }, 2000);
    });
    console.log('result: ', result);
  } finally {
    awaitLock.release();
  }
};

const Home: FC = () => {
  const { homeStore: store } = useStore();
  const state = useReactive({ input: '' });
  useEffect(() => {}, []);
  return (
    <div className="home__container flex_column">
      <CustSpin spinning={store.loading}></CustSpin>
      <Button
        onClick={() => {
          awaitLockDemo();
          awaitLockDemo();
          awaitLockDemo();
        }}
      >
        await-lock测试
      </Button>
      <Space size={10}>
        <Input placeholder="输入列表" value={state.input} onChange={e => (state.input = e.target.value)}></Input>
        <Button
          onClick={() => {
            store.main();
          }}
        >
          触发器
        </Button>
        <Upload
          className="home__upload"
          accept=".xlsx"
          onChange={upload => {
            console.log('upload', upload.file);
            store.fileMain(upload.file as unknown as File);
          }}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Excel上传</Button>
        </Upload>
      </Space>
    </div>
  );
};

export default observer(Home);
