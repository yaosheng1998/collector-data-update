import { RouteObject } from '@/routers/interface';
import SocketDemo from '@/pages/SocketDemo/SocketDemo';

// 首页模块
const socketDemoRouter: Array<RouteObject> = [
  {
    path: '/socket',
    element: <SocketDemo />,
    meta: {
      requiresAuth: false,
      title: 'socket测试',
      key: 'socket'
    }
  }
];

export default socketDemoRouter;
