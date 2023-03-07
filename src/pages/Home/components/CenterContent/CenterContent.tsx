import { FC, useEffect } from 'react';
import { Carousel } from 'antd';
import { useReactive } from 'ahooks';
import dayjs from 'dayjs';
import './CenterContent.less';

const tipList = [
    '安全课现场“钓鱼”众人上钩 信息泄露有多容易？',
    '鄂尔多斯市今年要植树800万株',
    '安全课现场“钓鱼”众人上钩 信息泄露有多容易？ '
];
const hotList = [
    '神舟十五号3名航天员顺利进驻中国空间站 两个航天员乘组首次实现“太空会师”',
    '李克强同哈萨克斯坦总理斯迈洛夫举行中哈总理会晤',
    '陈文清主持召开中央政法委员会全体会议强调 以有力举措贯彻落实党的二十大精神 坚决维护国家安全和社会稳定',
    '神舟十五号发射任务圆满成功',
    '激荡起高质量发展的澎湃动能——写在2022中国企业家博鳌论坛闭幕之际',
    '栗战书会见蒙古国总统呼日勒苏赫',
    '李克强在第八轮中日企业家和前高官对话会上发表致辞',
    '习近平同蒙古国总统呼日勒苏赫举行会谈',
    '前进，光荣和梦想的远征——写在习近平总书记提出中国梦十周年之际'
];
const carouselList = [
    'http://www.chizichina.com/uploads/191216/3-19121611315S35.jpg',
    'http://www.chizichina.com/uploads/191216/3-19121611315S35.jpg',
    'http://www.chizichina.com/uploads/191107/3-19110H23423217.jpg',
    'http://www.chizichina.com/uploads/191106/3-191106151301107.jpg',
    'http://www.chizichina.com/uploads/191106/3-1911061510143Z.jpg'
];
const m1List = [
    {
        titleList: ['资讯', '社会', '经济'],
        img: 'http://www.chizichina.com/uploads/allimg/221130/1-2211301242280-L.jpg',
        imgText: '神舟十五号3名航天员顺利进驻中国空间站 两个航天员乘组首次实现“太空会师”',
        bottomList: [
            '西部铁路建设加快 西安至重庆高铁安康至重庆段开工',
            '国产大飞机C919获颁生产许可证',
            '铁路新规发布 进一步强化车票实名制管理',
            '四川盆地再添超千亿方页岩气田',
            '河南长业建设集团董事长朱庆华用智慧书写安全生产新篇章'
        ],
        rightTitle: '前进，光荣和梦想的远征——写在习近平总书记提出中国梦十周年之际',
        rightList: [
            '银保监会明确保险公司开展个人养老金业务有关事项',
            '多省份启动2023年公务员招录 专设岗位招录残疾人',
            '我国开展十大主要粮食和畜禽育种攻关',
            '来自2022金融街论坛年会的重要信号',
            '巩固工业经济回升向好趋势，政策“组合拳”怎样加力？',
            '十余款国产化汽车芯片产品集中发布'
        ]
    },
    {
        titleList: ['文化', '公益', '人物'],
        img: 'http://www.chizichina.com/uploads/allimg/221130/1-2211301242280-L.jpg',
        imgText: '“丹青传情”艺术家作品联展成功举办 众多艺术大咖到场全程助阵',
        bottomList: [
            '“中国传统制茶技艺及其相关习俗”申遗成功',
            '“全民阅读·书店之选”“十佳”作品出炉',
            '安徽宏村：在世界文化遗产地传承非遗手艺',
            '激发全民族文化创新创造活力——在深刻领会新时代10年伟大变革中贯彻落实党的二十大精神之文化篇',
            '龙泉 千峰翠色入瓷来'
        ],
        rightTitle: '方寸之间 “印”相万千——应天印社的“前世今生”及诗经篆刻作品赏析',
        rightList: [
            '将歌声洒向草原深处——乌兰牧骑下乡演出侧记',
            '22日16时20分小雪：莫怪虹无影，如今小雪时',
            '第九届中原（鹤壁）文化产业博览交易会今日开幕',
            '解读中华文明基因的古老密码——殷墟考古成果探查',
            '张家川马家塬遗址揭开西戎族群的神秘面纱 千年“豪车”出土记',
            '山东：加快建设文化强省 推进文化自信自强'
        ]
    },
    {
        titleList: ['京津冀', '独家报道', '教育'],
        img: 'http://www.chizichina.com/uploads/allimg/191210/3-1912100U6270-L.jpg',
        imgText: '北京修订生活垃圾管理条例 外卖不得主动提供一次性筷子',
        bottomList: [
            '雄安发布构建现代化教育体系三年行动计划',
            '雄安新区：白洋淀首次记录到丹顶鹤的动态影像',
            '京唐、京滨城际开通在即 “轨道上的京津冀”网络更密集',
            '聚焦2022中国国际数字经济博览会｜河北6市跻身数字经济城市发展百强榜',
            '聚焦2022中国国际数字经济博览会｜加快发展数字经济建设数字河北：新一代信息技术构建增长新引擎'
        ],
        rightTitle: '北京城市副中心两大交通工程开建 2024年底通车',
        rightList: [
            '京津冀在行动|北京城市副中心所在地通州区获评“国家森林城市”',
            '中国式现代化河北场景｜建设陆海联动产城融合的临港产业强省',
            '雄安新区轨道交通网络加速建设',
            '河北中小学生秋季教学用书发行工作顺利完成',
            '京津冀签署协议建立民族地区青少年赴京津冀交流合作工作机制',
            '白洋淀实施清淤工程 淀泊再现“水清鸟翔”风光'
        ]
    }
];
const rightBottom = [
    '陈文清主持召开中央政法委员会全体会议强调 以有力举措贯彻落实党的二十大精神 坚决维护国家安全和社会稳定',
    '王毅会见俄罗斯新任驻华大使莫尔古洛夫',
    '胡春华在云南督导巩固拓展脱贫攻坚成果工作',
    '李克强同哈萨克斯坦总理斯迈洛夫举行中哈总理会晤',
    '前进，光荣和梦想的远征——写在习近平总书记提出中国梦十周年之际'
];
const m2ImgList = [
    {
        img: 'http://www.chizichina.com/uploads/allimg/221129/1-221129143K40-L.jpg',
        text: '前进，光荣和梦想的远征——写在习近平总书记提出中国梦十周年之际'
    },
    {
        img: 'http://www.chizichina.com/uploads/allimg/221129/1-2211291512550-L.jpg',
        text: '新时代新征程新伟业·二十大代表在基层丨路生梅：努力为基层医疗卫生事业“绽放”一生'
    },
    {
        img: 'http://www.chizichina.com/uploads/allimg/221128/1-22112P933570-L.jpg',
        text: '生物新材料造福重疾人群'
    },
    {
        img: 'http://www.chizichina.com/uploads/allimg/221129/1-2211291506330-L.jpg',
        text: '激荡起高质量发展的澎湃动能——写在2022中国企业家博鳌论坛闭幕之际'
    },
    {
        img: 'http://www.chizichina.com/uploads/allimg/221130/1-2211301242280-L.jpg',
        text: '神舟十五号3名航天员顺利进驻中国空间站 两个航天员乘组首次实现“太空会师”'
    }
];
const m3List = [
    {
        title: '法制中国',
        img: 'http://www.chizichina.com/uploads/image/20191217/1576548274510440.jpg',
        imgText: '山东淄博一医院原院长受贿案一审开庭 收受财物960万',
        bottomList: [
            '开启“税务+法治”直通车 照亮依法行政前行路',
            '深入学习贯彻党的二十大精神|四川:与水利部门共建都江堰灌区水利保护公益诉讼示范区',
            '以爱之名　以法之力——记山东省潍坊市奎文区检察院“春鸢”未检团队',
            '河南栾川:推出“民宿微检察”精准助力乡村振兴',
            'ST奥马：控股股东TCL家电因涉嫌收购违规被证监会立案',
            '中央纪委国家监委通报多名领导干部退而不＂休＂搞腐败'
        ]
    },
    {
        title: '深度',
        img: 'http://www.chizichina.com/uploads/allimg/220523/09141A1V-0-lp.jpg',
        imgText: '南水北调能否破解新难题',
        bottomList: [
            '共绘万里长江新图景——贯彻落实党的二十大精神推进长江经济带发展新观察',
            '国产汽车“加大油门”驶向全球',
            '10年来我国累计授权发明专利395.3万件——知识产权强国建设加快推进',
            '倪岳峰主持召开河北省应对新冠肺炎疫情工作领导小组会议暨全省视频调度会议',
            '以红旗渠精神谱写新时代青春答卷',
            '河北邯郸：“三个突出”全面推动县域共青团基层组织改革落地'
        ]
    },
    {
        title: '体育文娱',
        img: 'http://www.chizichina.com/uploads/allimg/191107/105AUI0-0-lp.jpg',
        imgText: '国内综艺“名校”担当 伯克利音乐学院被过度神化？',
        bottomList: [
            '开启“税务+法治”直通车 照亮依法行政前行路',
            '深入学习贯彻党的二十大精神|四川:与水利部门共建都江堰灌区水利保护公益诉讼示范区',
            '以爱之名　以法之力——记山东省潍坊市奎文区检察院“春鸢”未检团队',
            '河南栾川:推出“民宿微检察”精准助力乡村振兴',
            'ST奥马：控股股东TCL家电因涉嫌收购违规被证监会立案',
            '中央纪委国家监委通报多名领导干部退而不＂休＂搞腐败'
        ]
    },
    {
        title: '一带一路',
        img: 'http://www.chizichina.com/uploads/allimg/191209/14444T149-0-lp.jpg',
        imgText: '“致经典”双语诵读会“一带一路”选拔区正式启动',
        bottomList: [
            '重庆潼南：小柠檬连通国际大市场',
            '今年4月河北对“一带一路”沿线国家进出口同比增长3%',
            '第19届中国—东盟博览会筹备工作全面开展',
            '共建“一带一路”  厄中合作潜力巨大',
            '新西兰贸易部长：新中自贸协定升级将加速新西兰经济复苏',
            '中国科技助力泰国打造水上光伏电站'
        ]
    },
    {
        title: '赤子先锋',
        img: 'http://www.chizichina.com/uploads/allimg/191129/3-1911291022460-L.jpg',
        imgText: '“妈妈校长”烛照后来人 追记全国优秀教师刘美贤',
        bottomList: [
            '新时代新征程新伟业·二十大代表在基层丨路生梅：努力为基层医疗卫生事业“绽放”一生',
            '付素珍：做患者生命安全“最后防线”上的合格“特种兵”',
            '二十大代表在基层 | 戚红：当好“钢铁裁缝” 推动企业创新发展',
            '奋斗者正青春|神十三航天员:勇做新时代攀登者',
            '冯文虎：万吨巨轮的“钢铁裁缝”',
            '程旭：退伍军人的“输电人生”'
        ]
    },
    {
        title: '视点',
        img: 'http://www.chizichina.com/uploads/image/20191122/1574389500488841-lp.jpg',
        imgText: '上亿条个人信息可能被泄露 漏洞在哪？如何保护？',
        bottomList: [
            '吃橘子会致新冠病毒核酸检测呈阳性，是真的吗？记者实测',
            '杭州亚运会推出“亚运数字火炬手”',
            '寒潮天气将自西向东影响我国大部 局地降温达20℃以上',
            '在“世界超市”看全球贸易新风向——来自第28届义博会的观察',
            '千余家海内外展商亮相“中国海洋第一展”',
            '探日卫星“夸父一号”首次发布科学图像'
        ]
    },
    {
        title: '舆情',
        img: 'http://www.chizichina.com/uploads/image/20191217/1576548274510440.jpg',
        imgText: '京张大地的奥运回响',
        bottomList: [
            '中央气象台发布寒潮黄色预警',
            '坚决打赢常态化疫情防控攻坚战——近期抗击新冠疫情扫描',
            '寒潮天气将自北向南影响我国中东部地区',
            '事关解封条件、临时管控时间等，多地最新通报！',
            '今年入冬以来最强寒潮来袭',
            '四川健康码崩了！官方紧急提示：流量过大，正逐步恢复'
        ]
    },
    {
        title: '生活消费',
        img: 'http://www.chizichina.com/uploads/allimg/191119/10115U520-0-lp.jpg',
        imgText: '山东淄博一医院原院长受贿案一审开庭 收受财物960万',
        bottomList: [
            '开启“税务+法治”直通车 照亮依法行政前行路',
            '深入学习贯彻党的二十大精神|四川:与水利部门共建都江堰灌区水利保护公益诉讼示范区',
            '以爱之名　以法之力——记山东省潍坊市奎文区检察院“春鸢”未检团队',
            '河南栾川:推出“民宿微检察”精准助力乡村振兴',
            'ST奥马：控股股东TCL家电因涉嫌收购违规被证监会立案',
            '中央纪委国家监委通报多名领导干部退而不＂休＂搞腐败'
        ]
    },
    {
        title: '聚焦',
        img: 'http://www.chizichina.com/uploads/allimg/220323/22242V122-0-lp.jpg',
        imgText: '山东淄博一医院原院长受贿案一审开庭 收受财物960万',
        bottomList: [
            '开启“税务+法治”直通车 照亮依法行政前行路',
            '深入学习贯彻党的二十大精神|四川:与水利部门共建都江堰灌区水利保护公益诉讼示范区',
            '以爱之名　以法之力——记山东省潍坊市奎文区检察院“春鸢”未检团队',
            '河南栾川:推出“民宿微检察”精准助力乡村振兴',
            'ST奥马：控股股东TCL家电因涉嫌收购违规被证监会立案',
            '中央纪委国家监委通报多名领导干部退而不＂休＂搞腐败'
        ]
    },
    {
        title: '中国在线',
        img: 'http://www.chizichina.com/uploads/image/20191217/1576548274510440.jpg',
        imgText: '山东淄博一医院原院长受贿案一审开庭 收受财物960万',
        bottomList: [
            '开启“税务+法治”直通车 照亮依法行政前行路',
            '深入学习贯彻党的二十大精神|四川:与水利部门共建都江堰灌区水利保护公益诉讼示范区',
            '以爱之名　以法之力——记山东省潍坊市奎文区检察院“春鸢”未检团队',
            '河南栾川:推出“民宿微检察”精准助力乡村振兴',
            'ST奥马：控股股东TCL家电因涉嫌收购违规被证监会立案',
            '中央纪委国家监委通报多名领导干部退而不＂休＂搞腐败'
        ]
    },
    {
        title: '城乡观察',
        img: 'http://www.chizichina.com/uploads/image/20191120/1574216996104141-lp.jpg',
        imgText: '山东淄博一医院原院长受贿案一审开庭 收受财物960万',
        bottomList: [
            '开启“税务+法治”直通车 照亮依法行政前行路',
            '深入学习贯彻党的二十大精神|四川:与水利部门共建都江堰灌区水利保护公益诉讼示范区',
            '以爱之名　以法之力——记山东省潍坊市奎文区检察院“春鸢”未检团队',
            '河南栾川:推出“民宿微检察”精准助力乡村振兴',
            'ST奥马：控股股东TCL家电因涉嫌收购违规被证监会立案',
            '中央纪委国家监委通报多名领导干部退而不＂休＂搞腐败'
        ]
    },
    {
        title: '县域经济',
        img: 'http://www.chizichina.com/uploads/image/20191112/1573528103739716-lp.jpg',
        imgText: '山东淄博一医院原院长受贿案一审开庭 收受财物960万',
        bottomList: [
            '开启“税务+法治”直通车 照亮依法行政前行路',
            '深入学习贯彻党的二十大精神|四川:与水利部门共建都江堰灌区水利保护公益诉讼示范区',
            '以爱之名　以法之力——记山东省潍坊市奎文区检察院“春鸢”未检团队',
            '河南栾川:推出“民宿微检察”精准助力乡村振兴',
            'ST奥马：控股股东TCL家电因涉嫌收购违规被证监会立案',
            '中央纪委国家监委通报多名领导干部退而不＂休＂搞腐败'
        ]
    },
    {
        title: '食药健康',
        img: 'http://www.chizichina.com/uploads/image/20191212/1576138793682018.jpg',
        imgText: '山东淄博一医院原院长受贿案一审开庭 收受财物960万',
        bottomList: [
            '开启“税务+法治”直通车 照亮依法行政前行路',
            '深入学习贯彻党的二十大精神|四川:与水利部门共建都江堰灌区水利保护公益诉讼示范区',
            '以爱之名　以法之力——记山东省潍坊市奎文区检察院“春鸢”未检团队',
            '河南栾川:推出“民宿微检察”精准助力乡村振兴',
            'ST奥马：控股股东TCL家电因涉嫌收购违规被证监会立案',
            '中央纪委国家监委通报多名领导干部退而不＂休＂搞腐败'
        ]
    },
    {
        title: '脱贫攻坚',
        img: 'http://www.chizichina.com/uploads/allimg/191107/11095a4F-0-lp.jpg',
        imgText: '山东淄博一医院原院长受贿案一审开庭 收受财物960万',
        bottomList: [
            '开启“税务+法治”直通车 照亮依法行政前行路',
            '深入学习贯彻党的二十大精神|四川:与水利部门共建都江堰灌区水利保护公益诉讼示范区',
            '以爱之名　以法之力——记山东省潍坊市奎文区检察院“春鸢”未检团队',
            '河南栾川:推出“民宿微检察”精准助力乡村振兴',
            'ST奥马：控股股东TCL家电因涉嫌收购违规被证监会立案',
            '中央纪委国家监委通报多名领导干部退而不＂休＂搞腐败'
        ]
    },
    {
        title: '旅游',
        img: 'http://www.chizichina.com/uploads/allimg/220827/103945N39-0-lp.jpg',
        imgText: '山东淄博一医院原院长受贿案一审开庭 收受财物960万',
        bottomList: [
            '开启“税务+法治”直通车 照亮依法行政前行路',
            '深入学习贯彻党的二十大精神|四川:与水利部门共建都江堰灌区水利保护公益诉讼示范区',
            '以爱之名　以法之力——记山东省潍坊市奎文区检察院“春鸢”未检团队',
            '河南栾川:推出“民宿微检察”精准助力乡村振兴',
            'ST奥马：控股股东TCL家电因涉嫌收购违规被证监会立案',
            '中央纪委国家监委通报多名领导干部退而不＂休＂搞腐败'
        ]
    }
];

const CenterContent: FC = () => {
    const state = useReactive({ time: dayjs().format('YYYY/M/D HH:mm:ss') });
    useEffect(() => {
        const timer = setInterval(() => (state.time = dayjs().format('YYYY/M/D HH:mm:ss')), 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="center-content__container">
            <div className="center-content__search-wrap width_1200 flex flex_between">
                <div className="center-content__search-left flex">
                    <div className="center-content__search-gg flex flex_center">
                        <img
                            style={{ width: 26, height: 24, marginRight: 6 }}
                            src="http://www.chizichina.com/hdp/lingdang.png"
                            alt=""
                        />
                        <div>[ 公告 ]</div>
                    </div>
                    <div className="center-content__search-text flex">关于有人冒充我社工作人员的声明</div>
                </div>
                <div className="center-content__search-right flex">
                    <input type="text" />
                    <div className="center-content__search-btn">搜索</div>
                </div>
            </div>
            <div className="center-content__tips width_1200">
                <div className="center-content__tips-text">
                    <img src="http://www.chizichina.com/hdp/jiaobiao.png" alt="" />
                    <h1>习近平向第四届中俄能源商务论坛致贺信</h1>
                </div>
                <div className="center-content__tips-ul flex">
                    <img src="http://www.chizichina.com/s/images/jiantou.png" alt="" />
                    {tipList.map(item => (
                        <div className="center-content__tips-item" key={item}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div className="center-content__hot width_1200 flex flex_between">
                <div className="center-content__hot-left flex_column">
                    <div className="center-content__hot-left-top flex">
                        <div className="center-content__hot-title">今日热点</div>
                        <div>{state.time}</div>
                    </div>
                    <div className="center-content__list-ul flex_column">
                        {hotList.map(item => (
                            <div key={item}>{item}</div>
                        ))}
                    </div>
                </div>
                <div className="center-content__hot-right">
                    <Carousel autoplay>
                        {carouselList.map(item => (
                            <img key={item} src={item}></img>
                        ))}
                    </Carousel>
                </div>
            </div>
            <img className="center-content__phone width_1200" src="http://www.chizichina.com/img/ad1.jpg"></img>
            <div className="center-content__m1 width_1200 flex">
                <div className="center-content__m1-left">
                    {m1List.map((item, index) => (
                        <div style={{ marginTop: 8 }} key={index}>
                            <div className="center-content__m1-title flex">
                                {item.titleList.map(title => (
                                    <div key={title}>{title}</div>
                                ))}
                            </div>
                            <div className="flex">
                                <div className="flex_column" style={{ width: '50%' }}>
                                    <div className="flex" style={{ marginBottom: 6 }}>
                                        <img style={{ width: 200, height: 120 }} src={item.img} alt="" />
                                        <div className="center-content__img-text">{item.imgText}</div>
                                    </div>
                                    <div className="center-content__list-ul">
                                        {item.bottomList.map(bottom => (
                                            <div key={bottom}>{bottom}</div>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ width: '50%' }}>
                                    <div className="flex_column">
                                        <div className="center-content__right-title">{item.rightTitle}</div>
                                        <i></i>
                                    </div>
                                    <div className="center-content__list-ul">
                                        {item.rightList.map(title => (
                                            <div key={title}>{title}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="center-content__m1-right flex_1">
                    <div className="center-content__box">
                        <div className="center-content__box-title">读刊</div>
                        <img src="http://www.chizichina.com/uploads/allimg/180423/1-1P4231051180-L.jpg" alt="" />
                    </div>
                    <div className="center-content__m1-title flex">
                        <div>热点推荐</div>
                    </div>
                    <div className="center-content__right-img">
                        <img src="http://www.chizichina.com/uploads/allimg/221129/1-2211291506330-L.jpg" alt="" />
                        <div>激荡起高质量发展的澎湃动能——写在2022中国企业家博鳌论坛闭幕之际</div>
                    </div>
                    <div className="center-content__right-img">
                        <img src="http://www.chizichina.com/uploads/allimg/221129/1-221129143K40-L.jpg" alt="" />
                        <div>前进，光荣和梦想的远征——写在习近平总书记提出中国梦十周年之际</div>
                    </div>
                    <div className="center-content__list-ul flex_column">
                        {rightBottom.map(item => (
                            <div key={item}>{item}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="center-content__m2 width_1200 flex_column">
                <div className="center-content__m1-title flex">
                    <div>热点图片</div>
                </div>
                <div className="center-content__m2-list flex">
                    {m2ImgList.map(item => (
                        <div key={item.img}>
                            <img src={item.img} alt="" />
                            <div>{item.text}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="center-content__m3 width_1200 flex">
                {m3List.map(item => (
                    <div key={item.title} className="flex_column">
                        <div className="center-content__m1-title flex">
                            <div>{item.title}</div>
                        </div>
                        <div className="flex">
                            <img style={{ width: 200, height: 120 }} src={item.img} alt="" />
                            <div className="center-content__m3-text">{item.imgText}</div>
                        </div>
                        <div className="center-content__list-ul flex_column">
                            {item.bottomList.map(item => (
                                <div key={item}>{item}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CenterContent;
