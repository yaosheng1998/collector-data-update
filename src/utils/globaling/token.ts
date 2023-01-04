import { REACT_APP_AUTH } from '@/config';
import { getCookie } from './cookie';
import * as LZString from 'lz-string';

// 获取token
export const getToken = () => {
    const t = 'a8b4e90c-e781-4bcd-b135-85859f1e060d';
    let dm_token = localStorage.getItem('dm_token_') || '';
    if (location.hostname.indexOf('maicedata') !== -1) dm_token = getCookie('__DM_TOKEN__') || '';
    return ['dev', 'dev-pri'].includes(REACT_APP_AUTH) ? t : LZString.decompressFromEncodedURIComponent(dm_token);
};
