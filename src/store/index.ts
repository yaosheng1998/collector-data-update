import React from 'react';
import HomeStore from './HomeStore/HomeStore';
import SgsStore from './HomeStore/SgsStore';

class RootStore {
    constructor() {}
    readonly homeStore = new HomeStore();
    readonly sgsStore = new SgsStore();
}
// 实例化
const context = React.createContext(new RootStore());
export const useStore = () => React.useContext(context);
