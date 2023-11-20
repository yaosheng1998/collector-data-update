import { makeAutoObservable, runInAction } from 'mobx';
import { parseQueryResult, exportExcel, importsExcel } from '@/utils/globaling';
import dayjs from 'dayjs';
import request from '@/api';
interface ITemplate {
  uuid: string;
  env: string;
  token?: string;
}
class HomeStore {
  constructor() {
    makeAutoObservable(this);
  }
  loading = false;
  envToken = {
    '/qsh': 'e983561d-eaab-4d5c-8bf9-98e3553609f8',
    '/lp': 'c1375eb7-4371-4228-840b-090c917ca9b9'
  };
  // 读取excel数据
  async readExcel(excelFile: File) {
    const data = await importsExcel(excelFile);
    return data as Recordable[];
  }
  // 获取所有数据
  async getCollectorTotalData(template: ITemplate, params = {}) {
    const data = await request.getCollectorTotalData(`/collector/data/${template.uuid}`, params, {
      headers: { Authorization: template.token || this.envToken[template.env] },
      baseURL: template.env
    });
    return parseQueryResult(data.result);
  }
  // 数据拷贝
  async copyDataCoverFromOrigin(target: ITemplate, origin: ITemplate) {
    const originData = await this.getCollectorTotalData(origin);
  }
  // 数据修改
  async updateData(template: ITemplate, updateFun: Function) {
    const data = await this.getCollectorTotalData(template);
    const dataList = data.map(item => updateFun(item));
    for (let i = 0; i < dataList.length; i += 150) {
      const transaction = [
        {
          action: 'update',
          template_uuid: template.uuid,
          separate: dataList.slice(i, i + 150).map(({ id, ...extra }) => ({ id, extra }))
        }
      ];
      await request.post(
        '/collector/data/transaction',
        { transaction },
        { headers: { Authorization: template.token || this.envToken[template.env] }, baseURL: template.env }
      );
    }
  }
  // 数据删除
  async deleteData(template: ITemplate, filterFun?: Function) {
    const data = await this.getCollectorTotalData(template);
    const deleteData = filterFun ? data.filter(item => filterFun(item)) : data;
    for (let i = 0; i < deleteData.length; i += 150) {
      const transaction = [
        { action: 'delete', template_uuid: template.uuid, ids: deleteData.slice(i, i + 150).map(item => item['id']) }
      ];
      await request.post(
        '/collector/data/transaction',
        { transaction },
        { headers: { Authorization: template.token || this.envToken[template.env] }, baseURL: template.env }
      );
    }
  }
  // 数据导入
  async createData(template: ITemplate, dataList: Recordable[]) {
    for (let i = 0; i < dataList.length; i += 99) {
      const transaction = [{ action: 'create', template_uuid: template.uuid, extra: dataList.slice(i, i + 99) }];
      await request.post(
        '/collector/data/transaction',
        { transaction },
        { headers: { Authorization: template.token || this.envToken[template.env] }, baseURL: template.env }
      );
    }
  }
  // 全量导入
  async updateTotalData(template: ITemplate, dataList: Recordable[]) {
    await this.deleteData(template);
    await this.createData(template, dataList);
  }
  // 导出excel数据
  async exportDataToExcel(template: ITemplate) {
    const templateData = await request.get<Recordable>(
      `/collector/template/${template.uuid}`,
      {},
      {
        headers: { Authorization: template.token || this.envToken[template.env] },
        baseURL: template.env
      }
    );
    const data = await this.getCollectorTotalData(template);
    const properties = templateData.result?.extra?.json_schema?.properties || {};
    const excelTemplate = Object.keys(properties).map(key => {
      const info = properties[key];
      let t = 's';
      if (['number', 'integer'].includes(info.type)) t = 'n';
      return { title: info?.title, t, key };
    });
    const widthList = excelTemplate.map(() => ({ wpx: 150 }));
    exportExcel(excelTemplate, data, `${templateData.result?.title}.xlsx`, widthList);
  }
  // 下载文件
  async downloadFiles(template: ITemplate) {
    const data = await this.getCollectorTotalData(template);
    for (let i = 0; i < data.length; i++) {
      await new Promise(resolve => setTimeout(() => resolve(1), 500));
      const item = data[i];
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = item['协议地址'];
      link.setAttribute('download', item['协议地址'].split('/').pop());
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  // 触发器
  async main() {
    // const policyData = await this.getCollectorTotalData(
    //     { env: '/qsh', uuid: '1e0ba3e3-f028-4195-9768-46da85df7fcb' },
    //     { q: `paths @ '申请主体' && string == '人才'` }
    // );
    // const condition = await this.getCollectorTotalData(
    //     { env: '/qsh', uuid: '7d3d8206-0f6a-4044-92c1-eb2d1b531784' },
    //     { ops: '申报条件=学历||人才类型||人才荣誉' }
    // );
    // const policyMap = {};
    // policyData.forEach(item => {
    //     policyMap[item['政策细目']] = { id: item['id'] };
    // });
    // condition.forEach(item => {
    //     if (policyMap[item['政策细目']]) {
    //         const keyMap = { 人才类型: '人才类型', 学历: '人才学历', 人才荣誉: '人才荣誉' };
    //         if (!policyMap[item['政策细目']][keyMap[item['申报条件']]])
    //             policyMap[item['政策细目']][keyMap[item['申报条件']]] = [];
    //         if (!policyMap[item['政策细目']][keyMap[item['申报条件']]].includes(item['申报条件要求_文本']))
    //             policyMap[item['政策细目']][keyMap[item['申报条件']]].push(item['申报条件要求_文本']);
    //         // policyMap[item['政策细目']][keyMap[item['申报条件']]] = item['申报条件要求_文本'];
    //     }
    // });
    // console.log('policyData', policyData);
    // console.log('condition', condition);
    // console.log('policyMap', policyMap);
    // this.updateData({ env: '/lp', uuid: '2724a96d-3c11-4516-892c-650709acb761' }, item => ({
    //     id: item['id'],
    //     编辑时间: item['推进时间']
    // }));
    // this.deleteData({ env: '/qsh', uuid: '2a33f7d8-4f94-4f89-b327-97b5d2183816' });
    // this.exportDataToExcel({ env: '/qsh', uuid: 'f50745e5-2368-45ff-bfaa-479e741546cc' });
  }
  // 文件导入触发器
  async fileMain(file: File) {
    const dataList = await this.readExcel(file);
    console.log('dataList', dataList);
    // const list = ['序号', '产业链名称', '一级环节', '二级环节', '三级环节'];
    // const _dataList = dataList.map(item => {
    //   const obj = {};
    //   list.forEach(key => {
    //     if (item[key]) obj[key] = item[key];
    //   });
    //   return obj;
    // });
    // console.log('_datalist', _dataList);
    // this.updateTotalData({ env: '/lp', uuid: 'e28baa51-f9da-457c-b669-1a3031d0537e' }, _dataList);
    // dataList.forEach(item => {
    //     item['指标值'] = parseFloat(item['指标值']) || 0;
    //     item['指标日期'] = parseFloat(item['指标日期']) || 0;
    // });
    // this.updateTotalData({ env: '/qsh', uuid: '2a33f7d8-4f94-4f89-b327-97b5d2183816' }, dataList);
    // this.updateTotalData({ env: '/qsh', uuid: '2a33f7d8-4f94-4f89-b327-97b5d2183816' }, dataList);
    // console.log(
    //     'dataList',
    //     dataList.filter(item => typeof item['指标值'] === 'string')
    // );
    // const keyList = [
    //     '主办人',
    //     '企业信用代码',
    //     '企业名称',
    //     '协议申报名称',
    //     '申报状态',
    //     '履约状态',
    //     '申报状态',
    //     '财政联系电话',
    //     '责任部门',
    //     '部门联系电话'
    // ];
    // const time = dayjs().unix();
    // const list = dataList.map(item => {
    //     const obj = {};
    //     keyList.forEach(key => {
    //         obj[key] = item[key];
    //     });
    //     if (item['待办时间'] && time > item['待办时间戳']) {
    //         obj['申报状态'] = '已申报';
    //     }
    //     return {
    //         ...obj,
    //         财政联系电话: item['财政联系电话'] + '',
    //         部门联系电话: item['部门联系电话'] + '',
    //         ...(item['待办时间'] && { 待办时间: item['待办时间戳'] }),
    //         ...(item['申报截止日期'] && { 申报截止日期: item['申报截止日期时间戳'] }),
    //         ...(item['签约时间'] && { 签约时间: item['签约时间戳'] })
    //     };
    // });
    // console.log('list', list);
    // this.updateTotalData({ env: '/qsh', uuid: 'a5632bd1-f3f6-420a-bc33-728ded12b58d' }, list);
  }
}
export default HomeStore;

// 政策计算器-企业协议表 5392ed4b-684e-475f-9051-e4e0700df3d7
// keyList = ['企业名称', '协议类型', '可享受政策', '企业信用代码']
// 协议地址: `https://qingshanhu.metrodata.cn:9000/mdt-data/政策计算器协议/${item['企业协议pdf']}`,
// ...(item['签约时间'] && { 签约时间: item['签约时间戳'] })

// 政策计算器-企业协议申报项 d91e729f-7d77-4c95-9edf-76785b74cc1d
// keyList = ['企业信用代码', '企业名称', '协议申报名称', '责任部门']
// 申报状态: '未申报'
// 申报截止日期: item['申报截止日期时间戳']

// 政策计算器-企业协议申报项条件 f50745e5-2368-45ff-bfaa-479e741546cc
// keyList = ['企业信用代码', '企业名称', '协议申报名称', '申报条件', '申报条件描述', '申报条件类型']
// ...(item['申报条件要求_数值'] && { 申报条件要求_数值: item['申报条件要求_数值'] }),
// ...(item['申报条件要求_文本'] && { 申报条件要求_文本: item['申报条件要求_文本'] }),
// 申报截止日期: item['申报截止日期时间戳']

// 政策计算器-企业协议申报信息管理表 a5632bd1-f3f6-420a-bc33-728ded12b58d
// keyList = [
//     '主办人',
//     '企业信用代码',
//     '企业名称',
//     '协议申报名称',
//     '申报状态',
//     '履约状态',
//     '申报状态',
//     '财政联系电话',
//     '责任部门',
//     '部门联系电话'
// ]
// 财政联系电话: item['财政联系电话'] + '',
// 部门联系电话: item['部门联系电话'] + '',
// ...(item['待办时间'] && { 待办时间: item['待办时间戳'] }),
// ...(item['申报截止日期'] && { 申报截止日期: item['申报截止日期时间戳'] }),
// ...(item['签约时间'] && { 签约时间: item['签约时间戳'] })
