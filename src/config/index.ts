export const REACT_APP_AUTH = process.env.REACT_APP_ENV || 'dev';
export const REACT_APP_DELIVERY_URL = ['dev', 'dev-pri'].includes(REACT_APP_AUTH)
    ? '/delivery'
    : process.env.REACT_APP_DELIVERY_URL || '';
export const BASE_URL_DATLAS =
    { dev: '/datlas', 'dev-pri': '/qsh', prod: location.origin, pri: location.origin }[REACT_APP_AUTH] || '';
