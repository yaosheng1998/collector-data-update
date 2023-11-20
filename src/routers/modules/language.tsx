import { RouteObject } from '@/routers/interface';
import Language from '@/pages/Language/Language';

// 首页模块
const languageRouter: Array<RouteObject> = [
  {
    path: '/language',
    element: <Language />,
    meta: {
      requiresAuth: false,
      title: '多语言',
      key: 'home'
    }
  }
];

export default languageRouter;
