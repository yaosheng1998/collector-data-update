import React from 'react';
import HomeStore from './HomeStore/HomeStore';

class RootStore {
    constructor() {}
    readonly homeStore = new HomeStore();
}
// 实例化
const context = React.createContext(new RootStore());
export const useStore = () => React.useContext(context);
