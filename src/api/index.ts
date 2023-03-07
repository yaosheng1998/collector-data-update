import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from '@utils/globaling/token';
import { checkStatus } from './helper/checkStatus';
import { AxiosCanceler } from './helper/axiosCancel';
import { BASE_URL_DATLAS } from '@/config';
import to from 'await-to-js';

interface Result<T> {
    rc: number;
    result: T;
}

const axiosCanceler = new AxiosCanceler();

const config = {
    baseURL: BASE_URL_DATLAS,
    timeout: 1000000,
    headers: { Authorization: getToken() }
};

class RequestHttp {
    service: AxiosInstance;
    public constructor(config: AxiosRequestConfig) {
        this.service = axios.create(config);
        this.service.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                axiosCanceler.addPending(config);
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );

        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const { data, config } = response;
                axiosCanceler.removePending(config);
                return data;
            },
            async (error: AxiosError) => {
                const { response } = error;
                if (response) checkStatus(response.status);
                return Promise.reject(error);
            }
        );
    }

    // * 常用请求方法封装
    get<T = any[]>(url: string, params?: object, _object = {}): Promise<Result<T>> {
        return this.service.get(url, { params, ..._object });
    }
    post<T = any[]>(url: string, params?: object, _object = {}): Promise<Result<T>> {
        return this.service.post(url, params, _object);
    }
    put<T = any[]>(url: string, params?: object, _object = {}): Promise<Result<T>> {
        return this.service.put(url, params, _object);
    }
    delete<T = any[]>(url: string, params?: any, _object = {}): Promise<Result<T>> {
        return this.service.delete(url, { params, ..._object });
    }
    // * collector请求封装
    async getCollectorTotalData(url: string, params = {}, _object = {}) {
        const [cError, cData] = await to(this.get(url, { ...(params['q'] && { q: params['q'] }), a: 'id,count' }, _object));
        if (cError) return Promise.reject(cError);
        const length = (cData.result[0] || {})['__aggregate__'] || 0;
        let result = [];
        for (let i = 0; i * 1000 < length; i++) {
            const [error, data] = await to(this.get(url, { ...params, page_size: 1000, page_num: i }, _object));
            if (error) return Promise.reject(error);
            result = result.concat(data.result);
        }
        return { rc: 0, result };
    }
}

export default new RequestHttp(config);
