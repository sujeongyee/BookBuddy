import React, {useState, useEffect} from 'react';
import SelectCategory from '../component/SelectCategory';
import SelectKeyword from '../component/SelectKeyword';
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';

function UserRegist() {


    const [idCheck, setIdCheck] = useState(false);
    const [idMsg, setIdMsg] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwd2, setPwd2] = useState('');
    const [pwMsg, setPwMsg] = useState('');
    const [pwCheckMsg, setPwCheckMsg] = useState('');
    const [nickMsg, setNickMsg] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('naver.com');
    const [code, setCode] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const changeId = () => {
        setIdCheck(false);
        setIdMsg('');
    }

    const checkId = async (e) => {
        const id = document.querySelector(".regist-id").value;
        const response = await axios.post('/book/checkDuplicateId', {id});
        if (response.data) {
            setIdCheck(true);
            setIdMsg('사용 가능한 아이디입니다.');
        } else {
            setIdMsg('중복된 아이디입니다.');
        }
    }

    const checkPw = (e) => {
        setPwd(e.target.value);
        const pw = e.target.value;
        const isValid = pw.length >= 10 && /[0-9]/.test(pw) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw);
        if (isValid) {
            setPwMsg('사용 가능한 비밀번호입니다.');
        } else {
            setPwMsg('비밀번호는 10자 이상이어야 하고, 숫자와 특수문자를 반드시 포함해야 합니다.')
        }
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    const pwCheck = (e) => {
        setPwd2(e.target.value);
        const pw = e.target.value;
        if (pwd === pw) {
            setPwCheckMsg('비밀번호가 동일합니다. 확인 완료');
        } else {
            setPwCheckMsg('비밀번호가 다릅니다.');
        }
    }

    const checkNick = async () => {
        const nick = document.querySelector(".regist-nick").value;
        const response = await axios.post('/book/checkDuplicateNick', {nick});
        if (response.data) {
            setNickMsg('사용 가능한 닉네임입니다.');
        } else {
            setNickMsg('중복된 닉네임입니다.');
        }
    }

    const changeNick = () => {
        setNickMsg('');
    }

    const handleSelectChange = (event) => {
        setSelectedDomain(event.target.value);
    }
    const emailAuth = async () => {
        const area = document.querySelector(".authen");
        area.style.display = "block";
        const id = document.querySelector(".regist-mail").value;
        const email = id + '@' + selectedDomain;
        const response = await axios.post('/book/regist/sendMail', {email});
        setCode(response.data);
    }

    const codeCheck = () => {
        const codeInput = document.querySelector(".code-input").value;
        if (codeInput === code) {
            alert('인증이 완료됐습니다.');
            const area = document.querySelector(".authen");
            area.style.display = "none";
        } else {
            alert('인증에 실패했습니다.');
        }
    }

    const handleRegist = async (e) => {
        e.preventDefault();
        if (!idCheck) {
        }

    }

    return (
        <div className="registContent">
            <div className="logo-regist">
                <img src={process.env.PUBLIC_URL + "/imgs/logo-notext.png"} alt="Logo"/>
            </div>
            <form onSubmit={handleRegist}>
                <p className="regist-p">아이디 </p>
                <input className="regist-input-id regist-id" type="text" placeholder="아이디를 입력해주세요"
                       autoComplete="username"
                       onChange={changeId}/>
                <button className="id-check" onClick={checkId}>중복확인</button>
                <p className='msg idMsg'>{idMsg}</p>
                <div className="password-input-container">
                    <p className="regist-p">비밀번호</p>
                    <input className="regist-input regist-pw" type={showPassword ? 'text' : 'password'}
                           placeholder="비밀번호를 입력해주세요" autoComplete="current-password"
                           onChange={checkPw}/>

                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}
                                     className="password-toggle-icon"
                                     onClick={togglePasswordVisibility}
                    />
                </div>
                <p className='msg pwMsg'>{pwMsg}</p>
                <div className="password-input-container2">
                    <p className="regist-p">확인</p>
                    <input className="regist-input regist-pw2" type={showPassword2 ? 'text' : 'password'} placeholder="비밀번호를 한번 더 입력해주세요"
                           autoComplete="current-password" onChange={pwCheck}/>
                    <FontAwesomeIcon icon={showPassword2 ? faEyeSlash : faEye}
                                     className="password-toggle-icon2"
                                     onClick={togglePasswordVisibility2}/>
                </div>
                <p className='msg pwCheckMsg'>{pwCheckMsg}</p>
                <p className="regist-p">닉네임 </p>
                <input className="regist-input-id regist-nick" type="text" placeholder="닉네임을 입력해주세요"
                       autoComplete="username"
                       onChange={changeNick}/>
                <button className="id-check" onClick={checkNick}>중복확인</button>
                <p className='msg nickNameMsg'>{nickMsg}</p>
                <div>
                    <p className="regist-p">전화번호</p>
                    <input className="phone-input phone-input-first" value="010" disabled></input>{" "}-
                    <input className="phone-input"></input> -
                    <input className="phone-input"></input>
                </div>
                <p className='msg'></p>
                <p className="regist-p">이메일 </p>
                <input className="regist-input regist-mail" type="text" placeholder="이메일을 입력해주세요"
                       autoComplete="username"/>@
                <select className='mail-select' value={selectedDomain} onChange={handleSelectChange}>
                    <option selected>naver.com</option>
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
                <button className='email-auth' onClick={emailAuth}>인증번호발송</button>
                <div className='authen' style={{display: 'none'}}>
                    <p className='msg'></p>
                    <p className="regist-p">인증번호</p>
                    <input className="regist-input regist-email code-input" placeholder='이메일로 발송된 인증번호를 입력해주세요.'/>
                    <button className="id-check code-check" onClick={codeCheck}>인증하기</button>
                </div>
                <p className='msg'></p>
                <BirthDateSelect/>
                <p className='msg'></p>
                <SelectCategory/>
                <p className='msg'></p>
                <SelectKeyword/>
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
    const months = Array.from({length: 12}, (_, i) => i + 1); // 1부터 12까지 월 생성

    return (
        <select className="birth-box" id="birth-month">
            <option disabled selected>월</option>
            {months.map(month => (
                <option className='birth-option' key={month} value={month}>{month}</option>
            ))}
        </select>
    );
}

function BirthDaySelect() {
    const days = Array.from({length: 31}, (_, i) => i + 1); // 1부터 31까지 일 생성

    return (
        <select className="birth-box" id="birth-day">
            <option disabled selected>일</option>
            {days.map(day => (
                <option className='birth-option' key={day} value={day}>{day}</option>
            ))}
        </select>
    );
}

function BirthDateSelect() {
    return (
        <div>
            <p className="regist-p">생년월일</p>
            <BirthYearSelect/>
            <BirthMonthSelect/>
            <BirthDaySelect/>
        </div>
    );
}

export default UserRegist;
