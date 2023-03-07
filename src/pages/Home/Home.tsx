import { FC, useEffect } from 'react';
import { useStore } from '@/store';
import { observer } from 'mobx-react';
import { Button, Upload, Space, Input } from 'antd';
import { useReactive } from 'ahooks';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import CustSpin from '@/components/CustSpin/CustSpin';
import './Home.less';

const Home: FC = () => {
    const { homeStore: store } = useStore();
    const state = useReactive({ input: '' });
    return (
        <div className="home__container flex_column">
            <CustSpin spinning={store.loading}></CustSpin>
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
