import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import '../main/sidebar.css';
import { useUser } from "../context/UserContext";


const Notification = ({ message, onRemove }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onRemove(message.id); // 2초 후에 알림 제거
        }, 2500);

        return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리
    }, [message, onRemove]);

    return (
        <div className="notification">
            <span className="notification-icon">🔔</span>
            <span className="notification-message">{message.ntf_msg}</span>
        </div>
    );
};


const NotificationComponent = () => {

//     const { userData } = useUser();
//     const { userId, userNo } = userData;
//     const [notifications, setNotifications] = useState([]);

//     useEffect(() => {
//         const socket = new SockJS('http://localhost:8888/ws');
//         const stompClient = Stomp.over(socket);

//         stompClient.connect({}, (frame) => {
//             console.log('Connected: ' + frame);
//             stompClient.subscribe('/topic/notifications', (message) => {
//                 console.log('Received message: ' + message.body);
//                 const notification = JSON.parse(message.body);
//                 if(notification.receive_user == userNo) {
//                     notification.id = `notification-${Date.now()}`; // 고유 ID 부여
//                     setNotifications((prevNotifications) => [...prevNotifications, notification]);
//                 }        
//             });
//         }, (error) => {
//             console.error('Error: ' + error);
//         });

//         return () => {
//             stompClient.disconnect(() => {
//                 console.log('Disconnected');
//             });
//         };
//     }, []);

//     const removeNotification = (id) => {
//         setNotifications((prevNotifications) =>
//             prevNotifications.filter((notification) => notification.id !== id)
//         );
//     };

//     return (
//         <div>
//             <div className="notifications">
//                 {notifications.map((notification) => (
//                     <Notification key={notification.id} message={notification} onRemove={removeNotification} />
//                 ))}
//             </div>
//         </div>
//     );
 };

export default NotificationComponent
