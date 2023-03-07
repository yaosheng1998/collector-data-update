import { FC } from 'react';
import './MainHeader.less';

const logoRight = [
    { title: '网站导航', img: 'http://www.chizichina.com/img/i1.png' },
    { title: '赤子杂志', img: 'http://www.chizichina.com/img/i2.png' },
    { title: '人员查询', img: 'http://www.chizichina.com/img/i3.png' }
];

const navList = [
    '首页',
    '咨询',
    '社会',
    '经济',
    '独家报道',
    '法制中国',
    '深度',
    '体育文娱',
    '一带一路',
    '赤子先锋',
    '文化',
    '公益',
    '视点',
    '人物',
    '舆情',
    '生活消费',
    '聚焦',
    '中国在线',
    '城乡观察',
    '县域经济',
    '食药健康',
    '脱贫攻坚',
    '教育'
];

const MainHeader: FC = () => {
    return (
        <>
            <div className="main-header__container">
                <div className="main-header__top flex flex_center">
                    <div className="width_1200 flex">
                        <div>赤子网——中国人物新闻网站</div>
                        <div className="main-header__top-qc">|</div>
                        <div>新闻热线：010-85891267</div>
                    </div>
                </div>
                <div className="main-header__logo width_1200 flex">
                    <div className="main-header__logo-img">
                        <img src="http://www.chizichina.com/img/logo.png" alt="" />
                    </div>
                    <div className="main-header__logo-center">
                        <img style={{ width: 650, height: 100 }} src="http://www.chizichina.com/img/chizi2hui.jpg" alt="" />
                    </div>
                    <div className="main-header__logo-right flex_column flex_center">
                        {logoRight.map(item => (
                            <div key={item.title} className="main-header__logo-btn flex flex_center">
                                <img style={{ height: 20, width: 20, marginRight: 5 }} src={item.img} alt="" />
                                <div>{item.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="main-heder__nav">
                <div className="main-header__nav-inner width_1200 flex">
                    {navList.map(item => (
                        <div key={item} className="main-header__nav-item">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MainHeader;
