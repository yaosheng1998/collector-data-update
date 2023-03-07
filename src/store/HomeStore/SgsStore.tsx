import { makeAutoObservable, runInAction } from 'mobx';
import Skill from './result.json';

class SgsStore {
    constructor() {
        makeAutoObservable(this);
    }
    rect = [];
    nameBaseList = [];
    skillBaseList = [];
    nameMap = {};
    probablyList = [];
    colorList = [
        '#FF0000',
        '#CD5C5C',
        '#FF1493',
        '#FF7F50',
        '#483D8B',
        '#FFEFD5',
        '#FFFF00',
        '#ADFF2F',
        '#006400',
        '#90EE90',
        '#40E0D0',
        '#008080',
        '#00FFFF',
        '#0000CD',
        '#1E90FF',
        '#FF00FF',
        '#FFB6C1',
        '#696969'
    ];
    setRect(input: string) {
        const _input = input.replace(/\s*/g, '');
        const rect = []; // 矩阵对象
        const onlyList = []; // 单一名称列表
        const lastList = []; // 多名称字列表
        const probablyList = []; // 可能的名称列表
        const otherName = {}; // 多余字统计
        const confirmList = []; // 确定列表
        let otherList = []; // 多余字列表
        let child = [];
        console.log('input', _input);
        for (let i = 0; i < _input.length; i++) {
            const nameList = this.nameMap[_input[i]] || [];
            if (nameList.length === 1 && !onlyList.includes(nameList[0])) {
                onlyList.push(nameList[0]);
            }
        }
        for (let i = 0; i < _input.length; i++) {
            if (i % 6 === 0) child = [];
            const nameIndex = onlyList.findIndex(item => item.includes(_input[i]));
            if (nameIndex !== -1) {
                child.push({
                    title: _input[i],
                    color: this.colorList[nameIndex],
                    tip: `${nameIndex}_${onlyList[nameIndex].indexOf(_input[i]) + 1}`
                });
                onlyList[nameIndex] = onlyList[nameIndex].replace(_input[i], '');
            } else {
                child.push({ title: _input[i], color: '#fff', tip: '' });
                lastList.push(_input[i]);
                if (!otherName[_input[i]]) otherName[_input[i]] = { v1: 0, v2: 0 };
                otherName[_input[i]].v2++;
            }
            if (child.length === 6) rect.push(child);
        }
        if (child.length < 6) rect.push(child);
        this.nameBaseList.forEach(item => {
            let flag = true;
            for (let i = 0; i < item.length; i++) {
                if (!lastList.includes(item[i])) flag = false;
            }
            if (flag) probablyList.push(item);
        });
        probablyList.forEach(item => {
            for (let i of item) {
                if (!otherName[i]) otherName[i] = { v1: 0, v2: 0 };
                otherName[i].v1++;
            }
        });
        Object.keys(otherName).forEach(key => {
            const item = otherName[key];
            const number = item.v1 - item.v2;
            if (number > 0) otherList.push(...new Array(number).fill(key));
        });
        probablyList.forEach(item => {
            const indexList = [];
            for (let i of item) {
                const _index = otherList.findIndex(_item => _item === i);
                if (_index !== -1) indexList.push(_index);
            }
            if (indexList.length === item.length) {
                otherList = otherList.filter((_item, index) => !indexList.includes(index));
            } else confirmList.push(item);
        });
        rect.forEach(item => {
            item.forEach(_item => {
                if (_item.tip) return;
                const nameIndex = confirmList.findIndex(item => item.includes(_item.title));
                if (nameIndex === -1) return;
                _item.color = this.colorList[nameIndex + onlyList.length];
                confirmList[nameIndex] = confirmList[nameIndex].replace(_item.title, '');
            });
        });
        this.rect = rect;
        this.probablyList = probablyList;
        console.log('rect', rect);
        console.log('only', onlyList);
        console.log('可能的名称', probablyList);
        console.log('多余字统计', otherName);
        console.log('多余自列表', otherList);
        console.log('confirmList', confirmList);
    }
    init() {
        const string =
            '田丰,马腾,臧霸,彭羕,界吴懿,谋甄姬,谋曹仁,界朱治,胡金定,诸葛果,李丰,赵统赵广,王元姬,羊徽瑜,刘晔,司马师,司马昭,曹纯,朱灵,马钧,孙寒华,孙茹,凌操,南华老仙,庞德公,星张辽,星张郃,星徐晃,星甘宁,星黄忠,杨彪,祢衡,郑玄,黄月英,关羽,刘备,张飞,诸葛亮,赵云,马超,甄姬,司马懿,夏侯惇,张辽,曹操,许褚,郭嘉,大乔,孙尚香,吕蒙,周瑜,孙权,甘宁,陆逊,黄盖,貂蝉,华佗,华雄,吕布,袁术,神关羽,神吕蒙,魏延,黄忠,夏侯渊,曹仁,小乔,周泰,于吉,张角,神吕布,神曹操,祝融,孟获,徐晃,曹丕,孙坚,鲁肃,董卓,贾诩,神周瑜,神诸葛亮,卧龙诸葛,庞统,典韦,荀彧,太史慈,庞德,袁绍,颜良文丑,神司马懿,神赵云,刘禅,姜维,张郃,邓艾,孙策,张昭张纮,蔡文姬,左慈,神刘备,神陆逊,严颜,王基,蒯越蒯良,孙亮,陆绩,卢植,许攸,神张辽,神甘宁,诸葛瞻,陈到,毌丘俭,郝昭,周妃,陆抗,仲帝袁术,张绣,徐庶,法正,马谡,张春华,于禁,曹植,吴国太,凌统,徐盛,陈宫,高顺,关兴张苞,廖化,马岱,王异,曹彰,荀攸,钟会,步练师,程普,韩当,公孙瓒,刘表,关平,刘封,简雍,曹冲,满宠,郭淮,朱然,潘璋马忠,虞翻,伏皇后,李儒,吴懿,周仓,张松,曹真,陈群,韩浩史涣,孙鲁班,朱桓,顾雍,蔡夫人,沮授,夏侯氏,刘谌,张嶷,曹休,曹叡,钟繇,全琮,孙休,朱治,公孙渊,郭图逢纪,李严,黄皓,郭皇后,孙资刘放,孙登,岑昏,刘虞,张让,吴苋,秦宓,辛宪英,嵇康,徐氏,薛综,曹节,蔡邕,SP孙尚香,夏侯霸,马良,SP关羽,曹昂,诸葛诞,丁奉,诸葛瑾,伏完,潘凤,SP姜维,SP贾诩,乐进,文聘,孙鲁育,祖茂,诸葛恪,何太后,SP马超,张宝,关银屏,SP蔡文姬,SP庞德,SP曹仁,司马朗,曹洪,大乔小乔,SP貂蝉,SP赵云,刘协,SP徐庶,糜竺,李典,李通,程昱,贺齐,SP黄月英,严白虎,张鲁,蹋顿,张星彩,马云騄,孙乾,马忠,吕虔,SP庞统,步骘,潘濬,董白,刘琦,赵襄,董允,戏志才,杨修,卫温诸葛直,周鲂,SP太史慈,樊稠,董承,麹义,关索,杨仪,杜畿,陈琳,吕岱,孙皓,刘繇,士燮,李傕,陶谦,吕凯,鲁芝,阚泽,卑弥呼,刘焉,司马徽,审配,张梁,张济,王允,鲍三娘,沙摩柯,曹婴,张恭,贾逵,严畯,许贡,徐荣,苏飞,郭汜,傅肜,周群,张翼,邓芝,王朗,张琪瑛,丁原,公孙康,胡车儿,陈登,神荀彧,神郭嘉,费祎,陈震,卞夫人,王粲,孙邵,骆统,杜预,荀谌,神太史慈,神孙策,糜夫人,王甫赵累,王凌,辛毗,吴景,周处,孔融,羊祜,向宠,许靖,蔡贞姬,华歆,张温,桥公,刘璋,张仲景,文鸯,花鬘,宗预,王双,袁涣,孙翊,陈武董袭,高览,谋孙尚香,界祝融,界黄月英,谋夏侯氏,傅佥,刘巴,界伊籍,界关兴张苞,界关羽,界刘备,界刘禅,界卧龙诸葛,界周仓,界姜维,界孟获,界庞统,界廖化,界张飞,界法正,界简雍,界诸葛亮,界赵云,界马岱,界马超,界魏延,界黄忠,蒋琬,谋张飞,谋赵云,谋马超,谋黄忠,谯周,张昌蒲,界王异,界甄姬,阮慧,司马孚,崔琰,曹嵩,杨阜,毛玠,界于禁,界典韦,界司马懿,界夏侯惇,界夏侯渊,界张辽,界徐晃,界曹丕,界曹仁,界曹休,界曹彰,界曹操,界曹植,界曹真,界满宠,界荀彧,界许褚,界邓艾,界郭嘉,界郭淮,界钟会,界陈群,蒋干,谋于禁,谋徐晃,谋曹操,界吴国太,界大乔,界孙尚香,界孙鲁班,界小乔,界步练师,吕范,界全琮,界凌统,界吕蒙,界周泰,界周瑜,界孙休,界孙坚,界孙权,界张昭张纮,界徐盛,界朱然,界潘璋马忠,界甘宁,界程普,界虞翻,界陆逊,界韩当,界顾雍,界黄盖,蒋钦,谋吕蒙,谋周瑜,谋孙权,谋甘宁,谋黄盖,灵雎,界伏皇后,界蔡夫人,界蔡文姬,界貂蝉,谋刘赪,谋杨婉,兀突骨,朱儁,王濬,界于吉,界公孙瓒,界刘表,界华佗,界华雄,界吕布,界左慈,界庞德,界张角,界李儒,界沮授,界董卓,界袁术,界袁绍,界颜良文丑,界高顺,皇甫嵩,裴秀,谋华雄,阎圃,韩遂,马元义,马日磾';
        const nameList = string.split(',');
        const nameBaseList = nameList.filter(item => {
            if (['界', '星', '谋', '神'].includes(item[0])) return false;
            if (item.length >= 4) return false;
            if (item[0] === 'S' && item[1] === 'P') return false;
            return true;
        });
        const nameMap = {};
        nameBaseList.forEach(item => {
            for (let i of item) {
                if (!nameMap[i]) nameMap[i] = [];
                if (!nameMap[i].includes(item)) nameMap[i].push(item);
            }
        });
        const skillList = Skill.filter(item => item['技能名'].length).map(
            item =>
                item['技能名'][0]
                    ?.match(/\[.*\]/g)[0]
                    ?.replaceAll('[', '')
                    ?.replaceAll(']', '')
                    ?.split('|')[1]
        );
        const skillBaseList = Array.from(
            new Set([
                ...skillList,
                ...'举鸿,魅步,疬火,木牛流马,鸟翔,鬼道,鸡肋,鬼才,黩武,无懈可击,贯石斧,鸩毒,大宛,绝影,爪黄飞电,紫骍,骅骝,玉兰白龙驹,乌云踏雪,快航,赤兔,的卢,龙吟,骨疽,骄矜,骄恣,龙渊,龙胆,克复中原,固国安邦,文和乱武,号令天下,知己知彼,以逸待劳,远交近攻,火烧连营,勠力同心,联军盛宴,挟天子已令诸侯,调虎离山,诸葛连弩,青釭剑,雌雄双股剑,寒冰剑,古锭刀,青龙偃月刀,文八蛇矛,贯后斧,方天画戟,朱雀羽扇,麒麟弓,八卦阵,仁王盾,藤甲,白银狮子,防御马,进攻马,过河拆桥,顺手牵羊,决斗,无中生有,火攻,借刀杀人,南蛮入侵,万箭齐发,桃园结义,五谷丰登,铁索连环,无解可击,乐不思蜀,兵粮寸断,闪电'.split(
                    ','
                )
            ])
        );
        const skillMap = {};
        skillBaseList.forEach(item => {
            for (let i of item) {
                if (!skillMap[i]) skillMap[i] = [];
                if (!skillMap[i].includes(item)) skillMap[i].push(item);
            }
        });
        console.log('唯一值', Object.keys(skillMap).filter(key => skillMap[key].length === 1).length);
        console.log('namelist', nameBaseList);
        console.log('nameMap', nameMap);
        console.log('skillList', skillBaseList);
        console.log('skillMap', skillMap);
        this.nameBaseList = skillBaseList;
        this.nameMap = skillMap;
    }
    // 触发器
    async main() {}
}

export default SgsStore;
