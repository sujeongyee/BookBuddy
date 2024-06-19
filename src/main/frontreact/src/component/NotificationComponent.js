import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import '../main/sidebar.css';

const Notification = ({ message }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            const element = document.getElementById(message.id);
            if (element) {
                element.style.display = 'none';
            }
        }, 2000); // 2초 후에 알림 숨기기

        return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리
    }, [message]);

    return (
        <div id={message.id} className="notification">
            {message.ntf_msg}
        </div>
    );
};

const NotificationComponent = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8888/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/notifications', (message) => {
                console.log('Received message: ' + message.body);
                const notification = JSON.parse(message.body);
                notification.id = `notification-${Date.now()}`; // 고유 ID 부여
                setNotifications((prevNotifications) => [...prevNotifications, notification]);
            });
        }, (error) => {
            console.error('Error: ' + error);
        });

        return () => {
            stompClient.disconnect(() => {
                console.log('Disconnected');
            });
        };
    }, []);

    return (
        <div>
            <div className="notifications">
                {notifications.map((notification, index) => (
                    <Notification key={index} message={notification} />
                ))}
            </div>
        </div>
    );
};

export default NotificationComponent;
