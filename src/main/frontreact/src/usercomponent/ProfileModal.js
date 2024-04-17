
import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import axios from "axios";
import './mybook.css';
import { useUser } from "../context/UserContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProfileModal = ({ isOpen, onRequestClose, vo }) => {

  const {userData ,setUserData} = useUser();
  const {userId,userNick,profileURL} = userData;
  const [updatedVo, setUpdatedVo] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [golDisplay,setGolDisplay] = useState(false)
  const [profileImg,setprofileImg] = useState(profileURL);
  const [cateList,setCateList] = useState([]);
  const [kwdList,setKwdList] = useState([]);
  const [selectedCategories,setSelectedCategories] = useState([]);
  const [selectedKeywords,setSelectedKeywords] = useState([]);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const ctg = await axios.get('/book//getAllCategories');
        const kwd = await axios.get('/book/getAllKeywords');       
        setCateList(ctg.data);
        setKwdList(kwd.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();

  },[]);

  useEffect(() => {
    if(vo){
      setUpdatedVo(vo);
      console.log(vo);
      setStartDate(vo.user_BIRTH);
      setSelectedCategories(vo.category_NO.split(','));
      setSelectedKeywords(vo.keyword_NO.split(','));
    }
  }, [vo]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name=='emailOption'&& value!=='직접입력'){
      setGolDisplay(true);
    }else{
      setGolDisplay(false);
    }
    setUpdatedVo({ ...updatedVo, [name]: value });
  };

  const handleSubmit = async () => {
    try {

      onRequestClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  const dateChange = (date) => {
    setStartDate(date);
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
  const usuallyImg = () => {
    setprofileImg(profileURL);
  }
  const handleClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  const handleClick2 = (keyword) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedCategories(selectedKeywords.filter((c) => c !== keyword));
    } else {
      setSelectedCategories([...selectedKeywords, keyword]);
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
            <label className="input-file-btn" htmlFor="input-file">프로필 이미지 변경하기</label>  
            <label className="input-file-btn usuallyImg" onClick={usuallyImg}>원래 이미지 사용하기</label>          
            <input style={{display:'none'}} type="file" id="input-file" className="form-input" onChange={handleFileChange}></input>            
          </div>
          <div className="form-group">
            <label className="form-label modal-form-id">아이디</label><label className="id-nonChange">아이디는 변경이 불가합니다.</label>
            <input type="text" name="USER_ID" defaultValue={updatedVo.user_ID} disabled className="form-input" />
          </div>
          <div className="form-group with-btn">
            <label className="form-label">닉네임</label>
            <input type="text" name="USER_NICK" defaultValue={updatedVo.user_NICK} onChange={handleChange} className="form-input" />
            <button className="check-button">중복확인</button>
          </div>
          <div className="form-group">
            <label className="form-label">전화번호</label>
            <input type="text" className="form-input modal-phone" value="010" disabled></input>-
            <input type="text" className="form-input modal-phone"></input> -
            <input type="text" className="form-input modal-phone"></input>
          </div>
          <div className="form-group">
            <label className="form-label">이메일 </label>
            <input className="form-input modal-email" type="text" placeholder="이메일을 입력해주세요" name="USER_EMAIL"
                    autoComplete="" defaultValue={updatedVo.user_EMAIL} onChange={handleChange}/>
                    {golDisplay&&<span class="gol" style={{marginLeft: '5px'}}>@</span>}
            <select className='modal-form-sel mail-select' name="emailOption" defaultValue="직접입력" onChange={handleChange}>
              <option>직접입력</option>
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
            <button className="check-button">인증하기</button>
          </div>
          <div className="form-group">
              <label className="form-label">생년월일</label>
              <DatePicker dateFormat="yyyy-MM-dd" selected={startDate} onChange={dateChange} />
          </div>
          <div className="form-group cate-form">
            <div className="modal-cate-list">
              <label className="form-label">선호 카테고리 (클릭)</label>
              <ul>
                {cateList.map((category) => (
                  <li
                  key={category.category_NO}
                  className={selectedCategories.includes(category.category_NO) ? "modal-cate active" : "modal-cate"}
                  onClick={() => handleClick(category.category_NO)}
                >{category.category_NAME}</li>
                ))}
              </ul>
            </div>           
          </div>
          <div className="form-group cate-form">
            <div className="modal-cate-list">
              <label className="form-label">선호 키워드 (클릭)</label>
              <ul>
                {kwdList.map((keyword) => (
                  <li
                  key={keyword.keyword_NO}
                  className={selectedKeywords.includes(keyword.keyword_NO) ? "modal-kwd active" : "modal-kwd"}
                  onClick={() => handleClick2(keyword.keyword_NO)}
                  >{keyword.keyword_NAME}</li>
                ))}
              </ul>
            </div>           
          </div>
      </form>
      )}
    </Modal>
  )
}
export default ProfileModal