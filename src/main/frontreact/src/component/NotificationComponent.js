import React, { useState, useEffect } from 'react';
import Stomp from 'stompjs';


const NotificationComponent = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // WebSocket 연결
    const socket = new WebSocket('ws://localhost:8080/ws');
    const stompClient = Stomp.over(socket);
    stompClient.debug = null;

    // 연결이 성공하면 구독 시작
    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/notifications/${userId}`, (message) => {
        const notification = JSON.parse(message.body);
        setNotifications((prevNotifications) => [...prevNotifications, notification]);
      });
    });

    // 컴포넌트 언마운트 시 연결 종료
    return () => {
      stompClient.disconnect();
    };
  }, [userId]);

  return (
    <div>
      <h2>알림</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;