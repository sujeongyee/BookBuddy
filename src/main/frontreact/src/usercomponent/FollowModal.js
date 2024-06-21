import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { useUser } from "../context/UserContext";
import axios from "axios";
import "./mybook.css";
import ToastMsg from "../main/ToastMsg";

const FollowModal = ({ isOpen, onRequestClose, mode, userNo, addfollow, cancelfollow}) => {
  const { userData } = useUser();
  const { userId } = userData;
  const [followData, setFollowData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showToast2, setShowToast2] = useState(false);

  useEffect(() => {
    resetData();
    setShowToast(false);
    setShowToast2(false);
    if (isOpen) {
      setLoading(true);
      getFollow();
    }
    
  }, [mode,isOpen]);

  const resetData = () => {
    setFollowData([]);
  }

  const getFollow = async () => {
    try {
      if(userNo!=null){
        const response = await axios.get(`/book/user/getFollowList?id=${userId}&mode=${mode}&userNo=${userNo}`);
        setFollowData(response.data);
      }else{
        const response = await axios.get(`/book/user/getFollowList?id=${userId}&mode=${mode}`);
        setFollowData(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('팔로워 목록 불러오는 중 오류 발생:', error);
    }
  };

  const close = () => {
    onRequestClose();
  }

  const doFollow = async (userNo) => {
    setShowToast(false);
    setShowToast2(false);
    const isConfirmed = window.confirm('팔로우 하시겠습니까?');
    if (isConfirmed) {
      try {
        const response = await axios.get(`/book/user/addFollow?id=${userId}&toUserNo=${userNo}`);
        if (response.data == 1) {
          addfollow();
          setShowToast(true);
          setFollowData(prevFollowData =>
            prevFollowData.map(follow =>
              follow &&follow.user_NO === userNo ? { ...follow, check_following: true } : follow
            )
          );
        }
      } catch (error) {
        console.error('팔로우 하는 도중 오류 발생:', error);
      }
    }
  }

  const resetFollow = async (userNo) => {
    setShowToast(false);
    setShowToast2(false);

    const isConfirmed = window.confirm('팔로우 취소하시겠습니까?');
    if (isConfirmed) {
      try {
        const response = await axios.get(`/book/user/cancelFollow?id=${userId}&toUserNo=${userNo}`);
        if (response.data == 1) {
          cancelfollow();
          setShowToast2(true);
          setFollowData(prevFollowData =>
            prevFollowData.map(follow =>
              follow && follow.user_NO === userNo ? { ...follow, check_following: false } : follow
            )
          );
        }
      } catch (error) {
        console.error('팔로우 취소 하는 도중 오류 발생', error);
      }
    }
  }
  const navigate = useNavigate();
  const toUserFeed = async (feedId) =>{
    if(userId==feedId){
      navigate(`/myBook`);
      onRequestClose();
    }else{
      navigate(`/userFeed/${feedId}`);
      onRequestClose();
    }
    
  }

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
      maxWidth: "400px",
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

      {loading && (
        <div className="loading-container">
          
          <img src={process.env.PUBLIC_URL + '/imgs/loading4.gif'} alt="loading" />
        </div>
      )}
      {showToast && <ToastMsg prop="addFollowSuccess" />}
      {showToast2 && <ToastMsg prop="cancelFollowSuccess" />}
      <div className="follow-modal">
        <h2>{mode === 'follower' ? '팔로워' : '팔로잉'}</h2>
        <button className="modal-close2" onClick={close}>X</button>
        <ul className="follow-list">
          {!loading && followData.length==0 &&(
          <div style={{marginTop:'100px',color:'#838383'}}>
            {mode === 'follower' ? '팔로워 Buddy가 없습니다' : '팔로잉 한 Buddy가 없습니다.'}
          </div>)}
          {followData && followData.map((follow) => (
            follow && (
              <li key={follow.user_NO} className="follow-item">
                <div className="follow-modal-hov" onClick={()=> toUserFeed(follow.user_ID)}>
                  <img src={follow.profile_URL || process.env.PUBLIC_URL + '/imgs/no-profile.jpg'} alt={follow.user_NICK} className="follow-img" />
                  <p className="follow-name">{follow.user_NICK}</p>
                </div>
                
                <div className="follow-modal-btnZ">
                  {mode === 'follower' ? (
                    follow.check_following ? (
                      <button className="follow-button2" onClick={() => resetFollow(follow.user_NO)}>팔로우취소</button>
                    ) : (
                      <button className="follow-button" onClick={() => doFollow(follow.user_NO)}>팔로우하기</button>
                    )
                  ) :follow.check_following ? (
                    <button className="follow-button2" onClick={() => resetFollow(follow.user_NO)}>팔로우취소</button>
                  ):(<button className="follow-button" onClick={() => doFollow(follow.user_NO)}>팔로우하기</button>)}
                </div>
              </li>
            )
          ))}
          
        </ul>
      </div>
    </Modal>
  );
}

export default FollowModal;