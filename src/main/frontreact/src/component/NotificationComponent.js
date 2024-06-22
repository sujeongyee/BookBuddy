import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import '../main/sidebar.css';
import { useUser } from "../context/UserContext";

const Notification = ({ message, onRemove }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onRemove(message.id); // 3초 후에 알림 제거
        }, 3000);

        return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리
    }, [message, onRemove]);

    return (
        <div className="notification">
            <span className="notification-icon">🔔</span>
            <span className="notification-msg">{message.ntf_msg}</span>
        </div>
    );
};

const NotificationComponent = ({ notiCnt, setNotiCnt }) => {
    const { userData } = useUser();
    const { userNo } = userData;
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // 웹소켓 팩토리 메서드 작성
        const socketFactory = () => new SockJS('http://localhost:8888/book/ws');
        const stompClient = Stomp.over(socketFactory);

        // 자동 재연결 설정
        stompClient.reconnect_delay = 5000;
        stompClient.debug = () => {};
        stompClient.connect({}, (frame) => {
            //console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/notifications', (message) => {
                //console.log('Received message: ' + message.body);
                const notification = JSON.parse(message.body);
                if (notification.receive_user == userNo) {
                    notification.id = `notification-${Date.now()}`; // 고유 ID 부여
                    setNotifications((prevNotifications) => [...prevNotifications, notification]);
                    setNotiCnt(notiCnt + 1);
                }
            });
        }, (error) => {
            console.error('Error: ' + error);
        });

        // return () => {
        //     stompClient.disconnect(() => {
        //         console.log('Disconnected');
        //     });
        // };
    }, [setNotiCnt, userNo]);

    const removeNotification = (id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };

    return (
        <div>
            <div className="notifications">
                {notifications.map((notification) => (
                    <Notification key={notification.id} message={notification} onRemove={removeNotification} />
                ))}
            </div>
        </div>
    );
};

export default NotificationComponent;
