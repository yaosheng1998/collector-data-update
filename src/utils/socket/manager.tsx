/*
 * @Author: 姚盛<sheng.yao@going-link.com>
 * @Date: 2023-11-14 14:28:38
 * @LastEditors: 姚盛60364 sheng.yao@going-link.com
 * @LastEditTime: 2023-11-14 17:02:54
 * @FilePath: /collector-data-update/src/utils/socket/manager.tsx
 * @Description:
 */
import Socket from './socket';

const SocketManager = {
  // 全部的组件ID，每注册一个组件均放进去，销毁时移除
  ids: {},

  socket: null,
  // 创建一个socket连接，如果已经存在，直接返回
  createSocket(id: string) {
    if (this.ids[id]) {
      return console.warn('重复注册数据');
    }
    this.ids[id] = { id };
    if (this.socket) {
      return this.socket;
    }
    this.socket = new Socket(this.getSocketUrl(), {});
    this.socket.loadSocket();
    return this.socket;
  },
  getSocketUrl() {
    const url = `ws://localhost:3000/socket/demo`;
    return url;
  },
  destroySocket(id: string) {
    if (!this.ids[id]) {
      console.warn('未找到对应id');
      return false;
    }
    // 移除ID对应的所有监听
    this.socket.removeEventListeners(id);
    this.socket.removeMessageListeners(id);
    this.socket.removeWaitSocketConnect(id);
    delete this.ids[id];
    const ids = Object.keys(this.ids);
    if (!ids.length) {
      // 全部销毁了
      this.socket.destroy();
      this.socket = null;
    }
  }
};

export default SocketManager;
