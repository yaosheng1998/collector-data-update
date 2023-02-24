import { FC } from 'react';
import './MainFooter.less';

const companyList = [
    'http://www.chizichina.com/s/foot/img/01.png',
    'http://www.chizichina.com/s/foot/img/02.png',
    'http://www.chizichina.com/s/foot/img/03.png',
    'http://www.chizichina.com/s/foot/img/04.png',
    'http://www.chizichina.com/s/foot/img/05.png',
    'http://www.chizichina.com/s/foot/img/06.png',
    'http://www.chizichina.com/s/foot/img/07.png',
    'http://www.chizichina.com/s/foot/img/08.png'
];
const optionList = ['关于我们', '加入赤子', '合作伙伴', '网站声明', '人员查询'];
const infoList = [
    '备案号：京ICP备16019497号-1',
    '电话：010-85896757 服务邮箱：chizinews@163.com',
    '赤子杂志社主办 版权所有：赤子杂志社 Copyright©chizichina.com All Rights Reserved'
];

const MainFooter: FC = () => {
    return (
        <div className="main-footer__container flex_column">
            <div className="main-footer__company">
                <div className="main-footer__company-ul width_1200 flex">
                    <div className="main-footer__company-title">合作伙伴</div>
                    <img src="http://www.chizichina.com/s/foot/img/xian3.jpg" alt="" />
                    <div className="flex flex_1 flex_around">
                        {companyList.map(item => (
                            <img key={item} src={item} alt="" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="main-footer__options">
                <div className="main-footer__options-ul width_1200 flex">
                    {optionList.map((item, index) => (
                        <>
                            {!!index && <i>|</i>}
                            <div>{item}</div>
                        </>
                    ))}
                </div>
            </div>
            <div className="main-footer__contact flex">
                <div className="main-footer__contact-ul width_1200 flex">
                    <div className="main-footer__contact-left flex_column flex_1">
                        <img style={{ width: 199, height: 73 }} src="http://www.chizichina.com/s/foot/img/logo.png" alt="" />
                        <div>
                            赤子网系中国社会经济文化交流协会主管、赤子杂志社主办的中央级网络新闻媒体，是《赤子》杂志官方网站。
                        </div>
                    </div>
                    <i></i>
                    <div className="main-footer__contact-center flex_column flex_1">
                        <div className="flex">
                            <div className="main-footer__center-title">电话：</div>
                            <div>010-85891267</div>
                        </div>
                        <div className="flex">
                            <div className="main-footer__center-title">传真：</div>
                            <div>010-85891267</div>
                        </div>
                        <div className="flex">
                            <div className="main-footer__center-title">投稿邮箱：</div>
                            <div>chizinews@163.com</div>
                        </div>
                        <div className="flex">
                            <div className="main-footer__center-title">关注微博：</div>
                            <img src="http://www.chizichina.com/s/foot/img/wblogo.png" alt="" />
                        </div>
                    </div>
                    <i></i>
                    <div className="main-footer__contact-right flex flex_1">
                        <div className="flex_column">
                            <img style={{ width: 98, height: 97 }} src="http://www.chizichina.com/s/foot/img/ewm1.png" alt="" />
                            <div>扫描二维码可关注微信公众平台</div>
                        </div>
                        <div className="flex_column">
                            <img style={{ width: 98, height: 97 }} src="http://www.chizichina.com/s/foot/img/ewm.png" alt="" />
                            <div>扫描二维码手机浏览赤子网</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-footer__info">
                <div className="main-footer__info-ul width_1200 flex_column">
                    {infoList.map(item => (
                        <div key={item}>{item}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainFooter;
