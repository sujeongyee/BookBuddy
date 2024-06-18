import React, { useEffect, useState } from 'react';

const NotificationComponent = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080/ws/notifications');

        socket.onmessage = (event) => {
            const message = event.data;
            setNotifications(prevNotifications => [...prevNotifications, message]);
            setUnreadCount(prevCount => prevCount + 1);
        };

        return () => {
            socket.close();
        };
    }, []);

    const markAllAsRead = () => {
        setUnreadCount(0);
    };

    return (
        <div>
            <div className="header">
                <span className="bell">
                    🔔
                    {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
                </span>
                <button onClick={markAllAsRead}>Mark all as read</button>
            </div>
            <div className="notifications">
                {notifications.map((notification, index) => (
                    <div key={index} className="notification">
                        {notification}
                    </div>
                ))}
            </div>
        </div>
    );
};


export default NotificationComponent;