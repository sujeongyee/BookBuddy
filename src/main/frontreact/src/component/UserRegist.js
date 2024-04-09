import React, { useState, useEffect } from 'react';
import SelectCategory from '../component/SelectCategory';
import SelectKeyword from '../component/SelectKeyword';
import axios from "axios";

function UserRegist() {

  const[idCheck,setIdCheck] = useState(false);
  const [idMsg, setIdMsg] = useState('');
  const [pwd,setPwd] = useState('');
  const [pwd2,setPwd2] = useState('');
  const [pwMsg,setPwMsg] = useState('');
  const [pwCheckMsg, setPwCheckMsg] = useState('');

  const changeId = () => {
    setIdCheck(false);
    setIdMsg('');
  }

  const checkId = async (e) => {
    const id = document.querySelector(".regist-input-id").value;
    const response = await axios.post('/book/checkDuplicateId', { id });
    const idMsg = document.querySelector("idMsg");
    if(response.data){
      setIdCheck(true);    
      setIdMsg('사용 가능한 아이디입니다.') ;
    }else{
      setIdMsg('중복된 아이디입니다.') ;
    }
  }

  const checkPw = (e) => {
      setPwd(e.target.value);
      const pw = e.target.value;
      const isValid = pw.length >= 10 && /[0-9]/.test(pw) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw);
      if(isValid) {
          setPwMsg('사용 가능한 비밀번호입니다.');
      }else {
          setPwMsg('비밀번호는 10자 이상이어야 하고, 숫자와 특수문자를 반드시 포함해야 합니다.')
      }
  }

  const pwCheck = (e) => {
    setPwd2(e.target.value);
    const pw = e.target.value;
    if (pwd === pw) {
      setPwCheckMsg('비밀번호가 동일합니다. 확인 완료');
    } else {
      setPwCheckMsg('비밀번호가 다릅니다.');
    }
  }

  const handleRegist = async (e) => {
    e.preventDefault();
  }

  return (
    <div className="registContent">
      <div className="logo-regist">
        <img src={process.env.PUBLIC_URL + "/imgs/logo-notext.png"} alt="Logo"/>
      </div>
      <form onSubmit={handleRegist}>
        <p className="regist-p">아이디 </p>
        <input className="regist-input-id" type="text" placeholder="아이디를 입력해주세요" autoComplete="username" onChange={changeId}/>
        <button className="id-check" onClick={checkId}>중복확인</button>
        <p className='msg idMsg'>{idMsg}</p>
        <p className="regist-p">비밀번호</p>
        <input  className="regist-input" type="password" placeholder="비밀번호를 입력해주세요" autoComplete="current-password" onChange={checkPw} />
        <p className='msg pwMsg'>{pwMsg}</p>
        <p className="regist-p">확인</p>
        <input className="regist-input" type="password" placeholder="비밀번호를 한번 더 입력해주세요" autoComplete="current-password" onChange={pwCheck}/>
        <p className='msg pwCheckMsg'>{pwCheckMsg}</p>
        <p className="regist-p">닉네임 </p>
        <input className="regist-input-id" type="text" placeholder="닉네임을 입력해주세요" autoComplete="username"/>       
        <button className="id-check">중복확인</button>
        <p className='msg nickNameMsg'></p>
        <div>
          <p className="regist-p">전화번호</p>
          <input className="phone-input phone-input-first" value="010" disabled ></input>{" "}-
          <input className="phone-input"></input> -
          <input className="phone-input"></input>
        </div>
        <p className='msg'></p>
        <p className="regist-p">이메일 </p>
        <input className="regist-input" type="text" placeholder="이메일을 입력해주세요" autoComplete="username"/>
        <p className='msg'></p>
        <BirthDateSelect />
        <p className='msg'></p>
        <SelectCategory />
        <p className='msg'></p>
        <SelectKeyword />
        <p className='msg'></p>
        <button className="regist-btn" type="submit">
          가입하기
        </button>
      </form>
    </div>
  );
}

function BirthYearSelect() {
  const [birthYears, setBirthYears] = useState([]);

  const startYear = 1950;
  const endYear = new Date().getFullYear(); // 현재 연도

  // 반복문으로 옵션 생성
  const generateYears = () => {
      const years = [];
      for (let year = endYear; year >= startYear; year--) {
          years.push(year);
      }
      return years;
  };

  useEffect(() => {
      const years = generateYears();
      setBirthYears(years);
  }, []);

  return (
      <select className="birth-box birth-year-box" id="birth-year">
          <option disabled selected>출생 연도</option>
          {birthYears.map(year => (
              <option className='birth-option' key={year} value={year}>{year}</option>
          ))}
      </select>
  );
}

function BirthMonthSelect() {
  const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1부터 12까지 월 생성

  return (
      <select className="birth-box" id="birth-month">
          <option disabled selected>월</option>
          {months.map(month => (
              <option className='birth-option'  key={month} value={month}>{month}</option>
          ))}
      </select>
  );
}

function BirthDaySelect() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1); // 1부터 31까지 일 생성

  return (
      <select className="birth-box" id="birth-day">
          <option disabled selected>일</option>
          {days.map(day => (
              <option className='birth-option'  key={day} value={day}>{day}</option>
          ))}
      </select>
  );
}

function BirthDateSelect() {
  return (
      <div>
          <p className="regist-p">생년월일</p>
          <BirthYearSelect />
          <BirthMonthSelect />
          <BirthDaySelect />
      </div>
  );
}
export default UserRegist;
