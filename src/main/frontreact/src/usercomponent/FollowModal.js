import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { useUser } from "../context/UserContext";
import axios from "axios";
import "./mybook.css";
const FollowModal = ({ isOpen, onRequestClose, mode }) => {
  const { userData } = useUser();
  const { userId } = userData;
  const [followData, setFollowData] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    if (isOpen) {
      getFollow();
    }
    setLoading(true);
  }, [mode, isOpen]);

  const getFollow = async () => {
    try {
      const response = await axios.get(`/book/user/getFollowList?id=${userId}&mode=${mode}`);
      setFollowData(response.data);
    } catch (error) {
      console.error('팔로워 목록 불러오는 중 오류 발생:', error);
    }
  };

  // 모달 css
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      position: "relative",
      top: "auto",
      left: "auto",
      right: "auto",
      bottom: "auto",
      maxWidth: "500px",
      width: "90%",
      height: "90%",
      maxHeight: "80%",
      padding: "20px 30px 20px 20px",
      border: "none",
      borderRadius: "12px",
      backgroundColor: "#f7f7f7",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
      overflow: "auto",
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customModalStyles}>
      {loading && <div className="follow-modal">
        <h2>{mode === 'follower' ? '팔로워' : '팔로잉'}</h2>
        <ul className="follow-list">
          {followData && followData.map((follow) => (
            follow && (
              <li key={follow.user_NO} className="follow-item">
                <img src={follow.profile_URL || process.env.PUBLIC_URL + '/imgs/no-profile.jpg'} alt={follow.user_NICK} className="follow-img" />
                <p className="follow-name">{follow.user_NICK}</p>
              </li>
            )
          ))}
        </ul>
      </div>}
    </Modal>
  );
}

export default FollowModal;