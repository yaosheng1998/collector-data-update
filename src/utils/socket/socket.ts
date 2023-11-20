/* eslint-disable no-console */
import { uuid } from '../globaling';

class Socket {
  // socket唯一标识
  id = uuid();

  // 地址
  url = null;

  // 销毁标记
  destroyedFlag = false;

  // 配置
  config = {
    heartbeatTime: 10000, // 心跳间隔
    reconnectInterval: 5000 // 重连间隔
  };

  // socket connect对象
  connect = null;

  // 重连timeout
  reconnectTimeout = null;

  // 心跳body
  heartbeatBody = '';

  // 心跳信息，停止三次后进行重连
  heartbeatInfo = {
    count: 0,
    sessionId: null
  };

  // socket事件监听
  eventListeners = {};

  // socket消息监听
  messageListeners = {};

  // socket连接成功回调
  connectFinishListeners = {};

  // 连接状态
  connectStatus = 'none';

  // 是否在重连
  isReconnecting = false;

  constructor(url: string, config: Recordable = {}) {
    this.url = url;
    this.config = {
      ...this.config,
      ...config
    };
  }

  // 批量添加event监听器
  // funcs: { onError: null, onClose: null, onOpen: null, onMessage: null }
  registerEventListeners(id, funcs) {
    if (!id) {
      return false;
    }
    this.eventListeners[id] = funcs;
    return true;
  }

  // 单个event监听器
  registerEventListener(id, eventKey, func) {
    if (!id) {
      return false;
    }
    const funcs = this.eventListeners[id] || {};
    funcs[eventKey] = func;
    this.eventListeners[id] = funcs;
    return true;
  }

  // 移除event监听器
  removeEventListener(id, eventKey) {
    if (!id) return false;
    const funcs = this.eventListeners[id] || {};
    delete funcs[eventKey];
    if (Object.keys(funcs).length === 0) {
      delete this.eventListeners[id];
    } else {
      this.eventListeners[id] = funcs;
    }
    return true;
  }

  // 批量移除event监听器
  removeEventListeners(id) {
    if (!id) return false;
    delete this.eventListeners[id];
    return true;
  }

  // 批量注册消息监听器
  registerMessageListeners(id, funcs) {
    if (!id) return false;
    this.messageListeners[id] = funcs;
    return true;
  }

  // 注册消息监听器
  registerMessageListener(id, messageKey, func) {
    if (!id || !messageKey) return false;
    const funcs = this.messageListeners[id] || {};
    funcs[messageKey] = func;
    this.messageListeners[id] = funcs;
    return true;
  }

  // 批量移除消息监听器
  removeMessageListeners(id) {
    if (!id) return false;
    delete this.messageListeners[id];
    return true;
  }

  // 移除消息监听器
  removeMessageListener(id, messageKey) {
    if (!id || !messageKey) return false;
    const funcs = this.messageListeners[id] || {};
    delete funcs[messageKey];
    if (Object.keys(funcs).length === 0) {
      delete this.messageListeners[id];
    } else {
      this.messageListeners = funcs;
    }
    return true;
  }

  // socket连接成功回调
  waitSocketConnectFinish(id, func) {
    if (!id) return false;
    this.connectFinishListeners[id] = func;
    if (this.connectStatus === 'open') {
      if (typeof func === 'function') func();
    } else if (this.connectStatus === 'error') {
      // 连接失败，调用重连
      this.reconnect();
    }
  }

  // 移除socket连接成功回调
  removeWaitSocketConnect(id) {
    if (!id) return false;
    if (this.connectFinishListeners[id]) return true;
    delete this.connectFinishListeners[id];
    return true;
  }

  // 设置心跳额外内容
  setHeartbeatBody(body) {
    if (typeof body === 'string') {
      this.heartbeatBody = body;
    }
  }

  // 加载socket连接
  loadSocket() {
    this.close();
    if (this.destroyedFlag) {
      return;
    }
    const connect = new WebSocket(this.url);
    connect.onerror = evt => this.onError(evt);
    connect.onopen = evt => this.onOpen(evt);
    connect.onmessage = evt => this.onMessage(evt);
    connect.onclose = evt => this.onClose(evt);
    this.connect = connect;
    this.connectStatus = 'connecting'; // 连接中
  }

  // 重连
  reconnect() {
    if (this.destroyedFlag) {
      return;
    }
    if (this.isReconnecting) {
      return;
    }
    console.warn('即将重新连接');
    this.isReconnecting = true;
    this.reconnectTimeout = setTimeout(() => {
      this.isReconnecting = false;
      this.loadSocket();
      console.warn('重新连接中...');
    }, this.config.reconnectInterval);
  }

  // 断开连接
  close() {
    if (this.connect) {
      console.warn('正在断开连接...');
      this.connect.close();
      this.connect.onerror = null;
      this.connect.onopen = null;
      this.connect.onmessage = null;
      this.connect.onclose = null;
    }
    this.connect = null;
  }

  onError(evt) {
    console.warn('连接失败:', evt.code);
    const keys = Object.keys(this.eventListeners);
    keys.forEach(k => {
      const funcs = this.eventListeners[k] || {};
      if (typeof funcs.error === 'function') funcs.error(evt);
    });
    this.connectStatus = 'error';
  }

  onOpen(evt) {
    console.warn('连接成功');
    this.openHeartbeat();
    const keys = Object.keys(this.eventListeners);
    keys.forEach(k => {
      const funcs = this.eventListeners[k] || {};
      if (typeof funcs.open === 'function') funcs.open(evt);
    });
    this.connect.send(JSON.stringify({ key: 'PING', message: this.heartbeatBody }));
    this.connectStatus = 'open';
    const allCallback = Object.values(this.connectFinishListeners) || [];
    allCallback.forEach(e => {
      if (typeof e === 'function') e();
    });
  }

  onMessage(evt) {
    console.log('接收到消息', evt);
    const keys = Object.keys(this.eventListeners);
    keys.forEach(k => {
      const funcs = this.eventListeners[k] || {};
      if (typeof funcs.message === 'function') funcs.message(evt);
    });
    let result = null;
    try {
      result = JSON.parse(evt.data);
    } catch (err) {
      result = evt.data;
    }
    if (result.message === 'PONG') {
      if (this.heartbeatInfo.sessionId !== result.sessionId) {
        this.heartbeatInfo = {
          count: 0,
          sessionId: result.sessionId
        };
      } else {
        this.heartbeatInfo.count--;
      }
      return;
    }

    let msgContent = null;
    try {
      msgContent = JSON.parse(result.message);
    } catch (err) {
      msgContent = result.message;
    }

    const allMessageKeys = Object.keys(this.messageListeners);
    allMessageKeys.forEach(k => {
      const funcs = this.messageListeners[k];
      if (typeof funcs[result.key] === 'function') {
        funcs[result.key](msgContent);
      }
    });
  }

  onClose(evt) {
    // 如果已经销毁，不再处理事件
    if (this.destroyedFlag) {
      return;
    }
    this.connectStatus = 'closed';
    console.warn('连接断开...', evt);
    this.closeHeartbeat();
    const keys = Object.keys(this.eventListeners);
    keys.forEach(k => {
      const funcs = this.eventListeners[k] || {};
      if (typeof funcs.close === 'function') funcs.close(evt);
    });

    // 需要重连的状态码
    const reconnectCodes = [1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010];
    if (reconnectCodes.indexOf(Number(evt.code)) !== -1) {
      this.reconnect();
    }
  }

  // 心跳
  heartbeatInterval = null;

  openHeartbeat() {
    this.closeHeartbeat();
    this.heartbeatInterval = setInterval(() => {
      if (this.heartbeatInfo.count === 3) {
        const keys = Object.keys(this.eventListeners);
        keys.forEach(k => {
          const funcs = this.eventListeners[k] || {};
          if (typeof funcs.close === 'function') funcs.close();
        });
        this.loadSocket();
      } else {
        this.heartbeatInfo.count++;
        this.connect.send(JSON.stringify({ key: 'PING', message: this.heartbeatBody }));
      }
    }, this.config.heartbeatTime);
  }

  closeHeartbeat() {
    this.heartbeatInfo.count = 0;
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  /**
   * 聊天发送数据
   *
   * @param {Object} mesage
   */
  send(mesage) {
    this.connect.send(JSON.stringify(mesage));
  }

  destroy() {
    this.destroyedFlag = true;
    this.close();
    this.closeHeartbeat();
    clearTimeout(this.reconnectTimeout);
    this.reconnectTimeout = null;
    this.eventListeners = {};
    console.warn('socket销毁');
  }
}

export default Socket;
