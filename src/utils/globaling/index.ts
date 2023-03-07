import { writeFile, read, utils } from 'xlsx';
import _ from 'lodash';

// 获取url 中参数的方法
export const getQueryVariable = variable => {
    const hash = window.top.location.hash.split('?')[1];
    if (!hash) return '';
    const query = hash.split('&').filter(item => {
        const params = item.split('=');
        return params[0] == variable;
    });
    return decodeURIComponent(query[0] ? query[0].split('=')[1] : '');
};
// 格式化请求数据
export const parseQueryResult = (result: { id: number; update_time: number; create_time: number; extra: any }[]) => {
    return result.map(item => ({ ...item.extra, id: item.id }));
};
// 剔除对象中某个字段,返回新的对象
export const deleteObjectItem = (target: Record<string, any>, item: string) => {
    const targetClone = _.cloneDeep(target);
    delete targetClone[item];
    return targetClone;
};
// 生成随机uuid
export const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
// 浅克隆
export const shallowClone = (target: Recordable) => {
    return JSON.parse(JSON.stringify(target));
};
// 指标跳转
export const goIndexPage = (type: string, id: number) => {
    if (type === '结构对标') location.hash = `/detail/structural/${id}`;
    else if (type === '横向对标') location.hash = `/detail/benchmarking/${id}`;
    else if (type === '统计指标') location.hash = `/detail/statistical/${id}`;
    else if (type === '目标对标') location.hash = `/detail/target-benchmarking/${id}`;
};
// 深度搜索openKeys
export const findOpenKeys = (target: any[], key: string) => {
    const template = [];
    let result = [];
    let find = false;
    const findFun = (_target: any[]) => {
        if (find) return;
        for (let i = 0; i < _target.length; i++) {
            if (_target[i]['key'] === key) {
                find = true;
                template.push(key);
                result = template.slice();
            } else if (_target[i]['children']) {
                template.push(_target[i]['key']);
                findFun(_target[i]['children']);
                template.pop();
            }
        }
    };
    findFun(target);
    return result;
};
// 导出excel
export const exportExcel = (
    headers: Record<string, any>[],
    data: Record<string, any>[],
    fileName = 'demo.xlsx',
    wpx = [{ wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }]
) => {
    const keyList = headers.map(item => item.key);
    const output = {};
    const getHeaderId = (index: number) => {
        let id = '';
        while (index > 26) {
            id = String.fromCharCode(64 + (index % 26 || 26)) + id;
            index = index % 26 ? Math.floor(index / 26) : index / 26 - 1;
        }
        id = String.fromCharCode(64 + index) + id;
        return id;
    };
    headers.forEach((item, index) => (output[getHeaderId(index + 1) + 1] = { key: item.key, v: item.title, t: 's' }));
    data.forEach((item, i) =>
        keyList.forEach(
            (key, j) => (output[getHeaderId(j + 1) + (i + 2)] = { v: item[key], ...(headers[j]['t'] && { t: headers[j]['t'] }) })
        )
    );
    const outputPos = Object.keys(output);
    const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;
    const wb = { SheetNames: ['sheet'], Sheets: { sheet: Object.assign({}, output, { '!ref': ref, '!cols': wpx }) } };
    writeFile(wb, fileName);
};
// 导入excel
export const importsExcel = async (file: File) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = event => {
            try {
                const { result } = event.target;
                const workbook = read(result, { type: 'binary' });
                let data = [];
                for (const sheet in workbook.Sheets) {
                    data = data.concat(utils.sheet_to_json(workbook.Sheets[sheet]));
                }
                resolve(data);
            } catch (e) {
                reject('失败');
            }
        };
        fileReader.readAsBinaryString(file);
    });
};
