import { makeAutoObservable, runInAction } from 'mobx';
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
