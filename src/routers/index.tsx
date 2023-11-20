import { Navigate, useRoutes } from 'react-router-dom';
import { RouteObject } from '@/routers/interface';

// * 导入所有router
const metaRouters = import.meta.globEager('./modules/*.tsx');

// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
  Object.keys(metaRouters[item]).forEach((key: any) => {
    routerArray.push(...metaRouters[item][key]);
  });
});

export const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  ...routerArray
  // {
  //     path: '*',
  //     element: <Navigate to="/404" />
  // }
];

const Router = () => {
  const routes = useRoutes(rootRouter as any);
  return routes;
};

export default Router;
