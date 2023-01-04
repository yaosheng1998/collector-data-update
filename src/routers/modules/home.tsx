import { RouteObject } from '@/routers/interface';
import Home from '@pages/Home/Home';

// 首页模块
const homeRouter: Array<RouteObject> = [
    {
        path: '/home',
        element: <Home />,
        meta: {
            requiresAuth: false,
            title: '首页',
            key: 'home'
        }
    }
];

export default homeRouter;
