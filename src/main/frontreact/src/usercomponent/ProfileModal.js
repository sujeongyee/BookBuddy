
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axios from "axios";
import './mybook.css';
import { useUser } from "../context/UserContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 

const ProfileModal = ({ isOpen, onRequestClose, vo }) => {

  const navigate = useNavigate();
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
  const [code,setCode] = useState('');
  const [emailAuthCheck,setEmailAuthCheck] = useState(true);
  const [emailDisplay,setEmailDisplay] = useState(false);
  const [nicknmCheck,setNicknmCheck] = useState(false);
  const [nickMsg,setNickMsg] = useState('');
  const [emailMsg,setEmailMsg] = useState('');


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
      setStartDate(vo.user_BIRTH);
      setSelectedCategories(vo.category_NO.split(','));
      setSelectedKeywords(vo.keyword_NO.split(','));
    }
  }, [vo]);

  // 값변경
  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name=='emailOption'&& value!=='직접입력'){
      setGolDisplay(true);
    }else{
      setGolDisplay(false);
    }
    if(name=='newNick'){
      setNicknmCheck(false);
    }
    if(name=='email'||name=='emailOption'){
      setEmailMsg(false);
      setEmailAuthCheck(false);      
    }
    setUpdatedVo({ ...updatedVo, [name]: value });
  };

  //모달창끄기
  const close = () => {
    onRequestClose();
  }
  //프사변경
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setprofileImg(file);
    } else {
      console.error('Uploaded file is not an image.');
      alert('프로필 사진은 이미지만 첨부 가능합니다.');
    }
  };
  //원래프사로
  const usuallyImg = () => {
    setprofileImg(profileURL);
  }
  // 닉넴 중복체크
  const nickCheck = async(e) => {
    e.preventDefault();
    const nick = updatedVo.newNick;
    if(typeof nick === 'undefined'){
      setNickMsg('원래 사용하던 닉네임입니다.');
    }else{
      const response = await axios.post('/book/checkDuplicateNick', {nick});
      if (response.data) {
        setNickMsg('사용 가능한 닉네임입니다.');
        setNicknmCheck(true);
      } else {
        setNickMsg('중복된 닉네임입니다.' );
      }
    }  
  }
  // 이메일
  const emailAuth = (e) => {
    e.preventDefault();
    const email = updatedVo.email;
    const mailOption = updatedVo.emailOption;
    if(email&&mailOption){
      let mail;
      if(mailOption=='직접입력'){
        mail = email;
      }else{
        mail = email+'@'+mailOption;
      }
      if(mail==updatedVo.user_EMAIL){
        setEmailMsg('원래 사용하던 이메일 입니다.');
        setEmailAuthCheck(true);
        return;
      }
      setUpdatedVo({ ...updatedVo, ['newMail']: mail });
      auth(mail);      
    }else if(email){
      if(email==updatedVo.user_EMAIL){
        setEmailMsg('원래 사용하던 이메일 입니다.');
        setEmailAuthCheck(true);
        return;
      }
      setUpdatedVo({ ...updatedVo, ['newMail']: email });
      auth(email);
    }else{
      setEmailMsg('원래 사용하던 이메일 입니다.');
    } 
  }
  // 이메일 인증 보내기
  const auth = async(email)=>{
    setEmailDisplay(true);
    const response = await axios.post('/book/regist/sendMail', {email});
    setCode(response.data);
    
  }
  // 인증번호 확인하기
  const checkAuth = () => {
    const cd = document.querySelector(".codeInput").value;
    if(code==cd){
      setEmailAuthCheck(true);
      setEmailDisplay(false);
      setEmailMsg('(인증 완료)')
    }else{
      alert('인증번호가 틀립니다.');
    }
  }

  // 날짜변경
  const dateChange = (date,event) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    setStartDate(localDate); 
    setUpdatedVo({ ...updatedVo, ['newBirth']: localDate });
  };
   
  
  //카테고리선택
  const handleClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  //키워드선택
  const handleClick2 = (keyword) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter((c) => c !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };
  
  ///// 수정하기 버튼
  const handleSubmit = async (e) => {
    e.preventDefault();
    const phonePattern = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
    const phoneNo = document.querySelector(".phone-one").value + "-" + document.querySelector(".phone-two").value + "-" + document.querySelector(".phone-three").value;
    

    if(updatedVo.newNick!=updatedVo.user_NICK&&updatedVo.newNick){
      if(!nicknmCheck){
        alert('닉네임 중복 체크 해주세요.');
        return;
      }
    }
    
    if(updatedVo.phone1 || updatedVo.phone2 || updatedVo.phone3){
      if(!phonePattern.test(phoneNo)){
        alert('유효하지 않은 전화번호입니다.');
        return;
      }
    }

    if(!emailAuthCheck){
      alert('이메일 인증 해주세요');
      return;
    }

    if(selectedCategories.length==0){
      alert('카테고리 선택은 필수입니다.');
      return;
    }else if(selectedKeywords.length==0){
      alert('키워드 선택은 필수입니다.');
    }
    let ImgUrl;
    try {
      if(profileImg!=profileURL){
        //porfileURL aws에서 지워주는 작업
        const formData = new FormData();
        const deleteImg = await axios.delete(`/book/file/profileDelete`, {
          params: {
            profileURL: profileURL
          }
        });
        formData.append('profileImage', profileImg);
        const fileResponse = await axios.post('/book/file/profile', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        });
        ImgUrl=fileResponse.data;
      }else{
        ImgUrl=profileURL;
      }
    } catch (error) {
      console.error('프로필 이미지 업로드 오류:', error);
    }
    const UserVO = { 
      'user_NO': parseInt(updatedVo.user_NO),
      'user_ID': updatedVo.user_ID,
      'user_PWD': updatedVo.user_PWD,
      'user_NICK': updatedVo.newNick ? updatedVo.newNick : updatedVo.user_NICK,
      'user_PHONE': updatedVo.phone1 || updatedVo.phone2 || updatedVo.phone3 ? phoneNo : updatedVo.user_PHONE,
      'user_BIRTH': updatedVo.newBirth ? new Date(updatedVo.newBirth) : new Date(updatedVo.user_BIRTH),     
      'category_NO': selectedCategories.join(','),
      'keyword_NO': selectedKeywords.join(','),
      'user_EMAIL': updatedVo.newMail ? updatedVo.newMail : updatedVo.user_EMAIL,
      'profile_URL': ImgUrl,
    };
    const response = await axios.post('/book/user/updateProfile', UserVO, {
      headers: {
          'Content-Type': 'application/json'
      }
    });

    if (response.data) {
        alert('프로필을 수정 했습니다!');
        setUserData({ userId: response.data.user_ID, userNick: response.data.user_NICK, profileURL: response.data.profile_URL});
        sessionStorage.setItem("userVO",JSON.stringify(response.data));
        if(localStorage.getItem("userVO")){
          localStorage.setItem("userVO",JSON.stringify(response.data));
        }
        onRequestClose();
        window.location.reload();
    } else {
        alert('프로필 수정을 실패했습니다!');
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
      maxHeight: "80%",
      padding: "20px 30px 20px 20px",
      border: "none",
      borderRadius: "12px",
      backgroundColor: "#f7f7f7",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
      overflow: "auto",
    },
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
              <img src={URL.createObjectURL(profileImg)} alt="Profile" style={{ width: '100px' }} />
            }
          </div>
          <div className="form-group"> 
            <label className="input-file-btn" htmlFor="input-file">프로필 이미지 변경하기</label>  
            <label className="input-file-btn usuallyImg" onClick={usuallyImg}>원래 이미지 사용하기</label>          
            <input style={{display:'none'}} type="file"  accept="image/*" id="input-file" className="form-input" onChange={handleFileChange}></input>            
          </div>
          <div className="form-group">
            <label className="form-label modal-form-id">아이디</label><label className="id-nonChange">아이디는 변경이 불가합니다.</label>
            <input type="text" name="USER_ID" defaultValue={updatedVo.user_ID} disabled className="form-input" />
          </div>
          <div className="form-group with-btn">
            <p className="form-label form-p1" >닉네임</p><p className="form-p2">{nickMsg}</p><div></div>
            <input type="text" name="newNick" defaultValue={updatedVo.user_NICK} onChange={handleChange} className="form-input" />
            <button className="check-button" onClick={nickCheck}>중복확인</button>
          </div>
          <div className="form-group">
            <label className="form-label">전화번호</label>
            <input type="text" className="form-input modal-phone phone-one" defaultValue={updatedVo.user_PHONE.split('-')[0]} name="phone1" onChange={handleChange}></input>-
            <input type="text" className="form-input modal-phone phone-two" defaultValue={updatedVo.user_PHONE.split('-')[1]} name="phone2" onChange={handleChange}></input> -
            <input type="text" className="form-input modal-phone phone-three" defaultValue={updatedVo.user_PHONE.split('-')[2]} name="phone3" onChange={handleChange}></input>
          </div>
          <div className="form-group">
            <p className="form-label form-p1">이메일 </p><p className="form-p2">{emailMsg}</p><div></div>
            <input className="form-input modal-email" type="text" placeholder="이메일을 입력해주세요" name="email"
                    autoComplete="" defaultValue={updatedVo.user_EMAIL} onChange={handleChange}/>
                    {golDisplay&&<span className="gol" style={{marginLeft: '5px'}}>@</span>}
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
            <button className="check-button" onClick={emailAuth}>인증하기</button>
          </div>
          {emailDisplay&&
          <div>
            <input type="text" name="code" placeholder="인증코드를 입력해주세요" className="codeInput"></input>
            <button className="code-btn" onClick={checkAuth}>확인</button>
          </div>
          }
          <div className="form-group">
              <label className="form-label">생년월일</label>
              <DatePicker dateFormat="yyyy-MM-dd" name="USER_BIRTH" selected={startDate} onChange={dateChange} />
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
          <button type="submit" className="update-profile-btn" onClick={handleSubmit}>수정하기</button>
      </form>
      )}
    </Modal>
  )
}
export default ProfileModal