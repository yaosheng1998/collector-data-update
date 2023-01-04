import { FC, useEffect } from 'react';
import { useStore } from '@/store';
import { observer } from 'mobx-react';
import CustSpin from '@/components/CustSpin/CustSpin';
import './Home.less';

const Home: FC = () => {
    const { homeStore: store } = useStore();
    return (
        <div className="home__container">
            <CustSpin spinning={store.loading}></CustSpin>
            <div>123</div>
        </div>
    );
};

export default observer(Home);
