
import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import axios from "axios";
import './mybook.css';

const ProfileModal = ({ isOpen, onRequestClose, vo }) => {

  const [updatedVo, setUpdatedVo] = useState(null);

  useEffect(() => {
    setUpdatedVo(vo);
    console.log(vo);
  }, [vo]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedVo({ ...updatedVo, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // 수정된 프로필을 서버로 보내는 코드 작성
      // axios.put 또는 axios.post를 사용하여 서버에 수정된 데이터 전송
      // 예: await axios.put('/book/user/updateProfile', updatedVo);
      // 성공적으로 업데이트되면 모달을 닫거나 다른 작업 수행
      onRequestClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

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
      maxHeight: "80%",
      padding: "20px",
      border: "none",
      borderRadius: "12px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      overflow: "auto",
    },
  };
  

  return(
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customModalStyles} contentLabel="모달">
      <h2>프로필 수정하기</h2>
      <button onClick={onRequestClose}>x</button>
      {updatedVo && (
        <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">프로필사진</label>
          <input type="file" className="form-input"></input>
        </div>
        <div className="form-group">
          <label className="form-label">아이디</label>
          <input type="text" name="USER_ID" value={updatedVo.user_ID} disabled className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">닉네임</label>
          <input type="text" name="USER_NICK" value={updatedVo.user_NICK} onChange={handleChange} className="form-input" />
          <button className="check-button">중복확인</button>
        </div>
        <div className="form-group">
          <label className="form-label">전화번호</label>
          <input type="text" className="form-input" value="010" disabled></input>-
          <input type="text" className="form-input"></input> -
          <input type="text" className="form-input"></input>
        </div>
        <div>
          <label className="">이메일 </label>
          <input className="l" type="text" placeholder="이메일을 입력해주세요"
                  autoComplete="" value={updatedVo.user_EMAIL}/>
          <select className=''>
            <option selected>직접입력</option>
            <option>naver.com</option>
            <option>gmail.com</option>
            <option>daum.net</option>
            <option>nate.com</option>
            <option>hanmail.net</option>
            <option>yahoo.com</option>
            <option>hotmail.com</option>
            <option>outlook.com</option>
            <option>icloud.com</option>
            <option>hanmir.com</option>            
          </select>
          <button>인증하기</button>
        </div>    
      </form>
      )}
    </Modal>
  )
}
export default ProfileModal