import React, { useEffect } from 'react';
import io from 'socket.io-client';

const SocketClient = () => {
  const userId = localStorage.getItem('userId')
  useEffect(() => {
    const socket = io('http://localhost:5000', {
      query: { userId } // 发送用户身份信息给服务器
    }); // 这里的地址应该是你的 Nest.js 服务器地址

    socket.on('notification', (data) => {
      console.log('Received notification:', data);
      // 处理收到的通知
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
};

export default SocketClient;
