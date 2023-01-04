import { makeAutoObservable, runInAction } from 'mobx';
import { parseQueryResult, exportExcel } from '@/utils/globaling';
import * as API from '@api/collector';
import dayjs from 'dayjs';
import request from '@/api';

class HomeStore {
    constructor() {
        makeAutoObservable(this);
    }
    loading = false;
}
export default HomeStore;
