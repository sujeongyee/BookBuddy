
import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import axios from "axios";
import './mybook.css';
import { useUser } from "../context/UserContext";

const ProfileModal = ({ isOpen, onRequestClose, vo }) => {
  const {userData ,setUserData} = useUser();
  const {userId,userNick,profileURL} = userData;
  const [updatedVo, setUpdatedVo] = useState(null);

  const[profileImg,setprofileImg] = useState(profileURL);

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
      backgroundColor: "#f7f7f7",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
      overflow: "auto",
    },
  };

  const close = () => {
    setprofileImg(profileURL);
    onRequestClose();
  }
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setprofileImg(URL.createObjectURL(file));
    } else {
      console.error('Uploaded file is not an image.');
      alert('프로필 사진은 이미지만 첨부 가능합니다.');
    }
  };
  

  return(
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customModalStyles} contentLabel="모달">
      <div className="modal-header-h3">
        <h3>프로필 수정하기</h3>
      </div>
      
      <button className="modal-close" onClick={close}>X</button>
      {updatedVo && (
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">프로필사진</label>
            {profileImg === profileURL ?
              <img src={profileImg} alt="profile" style={{ width: '100px' }} />
              :
              <img src={profileImg} alt="Profile" style={{ width: '100px' }} />
            }
          </div>
          <div className="form-group"> 
            <label className="input-file-btn" for="input-file">프로필 이미지 변경하기</label>          
            <input style={{display:'none'}} type="file" id="input-file" className="form-input" onChange={handleFileChange}></input>            
          </div>
          <div className="form-group">
            <label className="form-label">아이디</label>
            <input type="text" name="USER_ID" value={updatedVo.user_ID} disabled className="form-input" />
          </div>
          <div className="form-group with-btn">
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
          <div className="form-group">
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