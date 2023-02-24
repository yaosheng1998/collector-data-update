import { REACT_APP_AUTH } from '@/config';
import { getCookie } from './cookie';
import * as LZString from 'lz-string';

// 获取token
export const getToken = () => {
    const t = '28d72b64-22ab-4bba-bfcf-923b8a12ce95';
    let dm_token = localStorage.getItem('dm_token_') || '';
    if (location.hostname.indexOf('maicedata') !== -1) dm_token = getCookie('__DM_TOKEN__') || '';
    return ['dev', 'dev-pri'].includes(REACT_APP_AUTH) ? t : LZString.decompressFromEncodedURIComponent(dm_token);
};
