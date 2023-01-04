import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import AuthRouter from '@/routers/utils/authRouter';
import Router from '@/routers/index';
import '@styles/reset.less';
import '@styles/global.less';
import '@styles/common.less';

const App = () => {
    return (
        <HashRouter>
            <ConfigProvider locale={zhCN}>
                <AuthRouter>
                    <Router />
                </AuthRouter>
            </ConfigProvider>
        </HashRouter>
    );
};

export default App;
