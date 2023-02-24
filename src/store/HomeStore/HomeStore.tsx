import { makeAutoObservable, runInAction } from 'mobx';
import dayjs from 'dayjs';
import request from '@/api';

class HomeStore {
    constructor() {
        makeAutoObservable(this);
    }
}
export default HomeStore;
