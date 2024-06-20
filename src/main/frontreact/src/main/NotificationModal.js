
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axios from "axios";
import './main.css';
import { useUser } from "../context/UserContext";


const NotificationModal = ({ isOpen, onRequestClose, notiCnt, setNotiCnt}) =>{
  const {userData ,setUserData} = useUser();
  const {userNo} = userData;
  const [notiData,setNotiData] = useState([]);
  const navigate = useNavigate();
  const [showUnreadOnly, setShowUnreadOnly] = useState(true); // 초기값은 안 읽은 알림만 보기

  useEffect(()=>{
    
    const fetchNotiData = async() => {
      try {
        const response = await axios.get(`/book/getNoti?userNo=${userNo}`);
        setNotiData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('알림 내용 불러오는 도중 오류 발생',error)
      }
    }
    if(isOpen){
      fetchNotiData();
    }
  },[isOpen])

  const handleNotificationClick = (notification) => {
    if (notification.post_type && notification.post_no) {
      navigate(`/post/${notification.post_type}/${notification.post_no}`);
      onRequestClose();
    }
  };

  // 모달 css
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgb(0 0 0 / 7%)",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-start",
      paddingTop: "70px",
      paddingRight: "20px",
    },
    content: {
      position: "relative",
      top: "0px",
      left: "0px",
      right: "auto",
      bottom: "auto",
      maxWidth: "300px",
      width: "90%",
      maxHeight: "80%",
      padding: "20px 30px 20px 20px",
      border: "none",
      borderRadius: "12px",
      backgroundColor: "#f7f7f7",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
      overflow: "auto",
    },
  };

  const markAsRead = async (ntf_no) => {
    try {
      await axios.post(`/book/noti/readNotification?ntfNo=${ntf_no}`);
      setNotiCnt(notiCnt-1);
      setNotiData(prevNotiData =>
        prevNotiData.map(notification =>
          notification.ntf_no === ntf_no ? { ...notification, ntf_check: true } : notification
        )
      );
    } catch (error) {
      console.error('알림 읽음 처리 도중 오류 발생', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.post(`/book/markAllAsRead?userNo=${userNo}`);
      setNotiData(prevNotiData =>
        prevNotiData.map(notification => ({ ...notification, ntf_check: true }))
      );
      setNotiCnt(0);
    } catch (error) {
      console.error('전체 알림 읽음 처리 도중 오류 발생', error);
    }
  };

  const handleShowUnreadClick = () => {
    setShowUnreadOnly(true);
  };

  const handleShowAllClick = () => {
    setShowUnreadOnly(false);
  };

  return(
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customModalStyles} contentLabel="알림 모달">
      <div className="notification-modal">
        <div className="notification-modal-header">
          
          <button onClick={markAllAsRead} className="mark-all-read-button">전체 읽기</button>
        </div>
        <div>
          <button onClick={handleShowUnreadClick} className={`show-unread-button ${showUnreadOnly ? 'active' : ''}`}>안 읽은 알림만 보기</button>
          <button onClick={handleShowAllClick} className={`show-all-button ${!showUnreadOnly ? 'active' : ''}`}>모든 알림 보기</button>
        </div>
        {notiData.length === 0 ? (
          <p>알림이 없습니다.</p>
        ) : (
          <ul className="notification-list">
            {notiData.map((notification) => {
              if (showUnreadOnly && notification.ntf_check) {
                return null; // 안 읽은 알림만 보기가 체크되어 있고, 읽은 알림은 무시
              }
              return (
                <li
                  key={notification.ntf_no}
                  className={`notification-item ${notification.ntf_check ? 'read' : 'unread'}`}
                >
                  <p className="notification-message">
                    {notification.ntf_msg.split('게시글에')[0]}
                    <span 
                      className="post-title-link" 
                      onClick={() => {
                        handleNotificationClick(notification);
                        onRequestClose();
                      }}
                    >
                      {notification.post_title}
                    </span>
                    게시글에 {notification.ntf_msg.split('게시글에')[1]}
                  </p>
                  <div className="notification-modal-zone">
                    <span className="notification-time">{new Date(notification.ntf_time).toLocaleString()}</span>
                    {!notification.ntf_check && (
                      <button onClick={() => markAsRead(notification.ntf_no)} className="mark-read-button">읽기</button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Modal>
  )
}
export default NotificationModal