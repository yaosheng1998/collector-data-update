/*
 * @Author: 姚盛<sheng.yao@going-link.com>
 * @Date: 2023-11-14 14:09:12
 * @LastEditors: 姚盛60364 sheng.yao@going-link.com
 * @LastEditTime: 2023-11-16 15:54:35
 * @FilePath: /collector-data-update/src/pages/SocketDemo/SocketDemo.tsx
 * @Description:
 */
import { FC, useEffect, useRef } from 'react';
import { useStore } from '@/store';
import { observer } from 'mobx-react';
import { Button, Upload, Space, Input } from 'antd';
import { useReactive } from 'ahooks';
import { uuid } from '@/utils/globaling';
import SocketManager from '@/utils/socket/manager';
import axios from 'axios';

const SocketDemo: FC = () => {
  const { homeStore: store } = useStore();
  const cache = useRef({ uuid: uuid() });
  // const state = useReactive({ uuid: uuid() });
  useEffect(() => {}, []);
  return (
    <div className="socket-demo__container flex_column">
      <Button
        onClick={() => {
          SocketManager.createSocket(cache.current.uuid);
        }}
      >
        点击开始连接
      </Button>
      <Button
        onClick={async () => {
          const res = await axios.get('http://localhost:3000/users/get/all');
          console.log('获取结果', res);
        }}
      >
        接口测试
      </Button>
    </div>
  );
};

export default observer(SocketDemo);
