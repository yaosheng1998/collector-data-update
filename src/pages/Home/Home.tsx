import { FC } from 'react';
import { observer } from 'mobx-react';
import MainHeader from './components/MainHeader/MainHeader';
import CenterContent from './components/CenterContent/CenterContent';
import MainFooter from './components/MainFooter/MainFooter';
import './Home.less';

const Home: FC = () => {
    return (
        <div className="home__container flex_column">
            <MainHeader></MainHeader>
            <CenterContent></CenterContent>
            <MainFooter></MainFooter>
        </div>
    );
};

export default observer(Home);
