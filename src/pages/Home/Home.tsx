import { FC, useEffect } from 'react';
import { useStore } from '@/store';
import { observer } from 'mobx-react';
import { Button, Upload, Space, Input } from 'antd';
import { useReactive } from 'ahooks';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import CustSpin from '@/components/CustSpin/CustSpin';
import './Home.less';

const Home: FC = () => {
    const { homeStore: store, sgsStore } = useStore();
    const state = useReactive({ input: '' });
    useEffect(() => {
        sgsStore.init();
    }, []);
    return (
        <div className="home__container flex_column">
            <CustSpin spinning={store.loading}></CustSpin>
            <Space size={10}>
                <Input placeholder="输入列表" value={state.input} onChange={e => (state.input = e.target.value)}></Input>
                {/* <Button
                    type="primary"
                    onClick={() => {
                        sgsStore.setRect(state.input);
                    }}
                >
                    确认
                </Button> */}
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
            <Space size={20}>
                <div className="home__name-rect flex—column">
                    {sgsStore.rect.map((item, index) => (
                        <div key={index} className="home__name-row flex">
                            {item.map((child, index) => (
                                <div key={index} className="home__name-cell" style={{ backgroundColor: child.color }}>
                                    <span>{child.title}</span>
                                    {/* <span className="home__name-tip">{child.tip || 0}</span> */}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                {/* <div className="home__name-probably">
                    {sgsStore.probablyList.map(item => (
                        <div key={item} className="home__probably-item">
                            {item}
                        </div>
                    ))}
                </div> */}
            </Space>
        </div>
    );
};

export default observer(Home);
