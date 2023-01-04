import { FC } from 'react';
import CLN from 'classname';
import { Spin } from 'antd';
import './CustSpin.less';

interface IProps {
    className?: string;
    spinning: boolean;
}

const CustSpin: FC<IProps> = props => {
    const { className, spinning } = props;
    return (
        <div className={CLN('cust-spin flex flex_center', className, { 'cust-spin__hide': !spinning })}>
            <Spin size="large" spinning={spinning}></Spin>
        </div>
    );
};

export default CustSpin;
