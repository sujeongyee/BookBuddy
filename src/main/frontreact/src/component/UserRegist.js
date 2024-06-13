import React, {useState, useEffect} from 'react';
import SelectCategory from '../component/SelectCategory';
import SelectKeyword from '../component/SelectKeyword';
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';


function UserRegist() {

    const [idCheck, setIdCheck] = useState(false);
    const [idMsg, setIdMsg] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwd2, setPwd2] = useState('');
    const [pwMsg, setPwMsg] = useState('');
    const [pwCheckMsg, setPwCheckMsg] = useState('');
    const [nickCheck, setNickCheck] = useState(false);
    const [nickMsg, setNickMsg] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('naver.com');
    const [code, setCode] = useState('');
    const [email,setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [emailCheck, setEmailCheck] = useState(false);
    const [selectYear,setSelectYear] = useState('');
    const [selectMonth,setSelectMonth] = useState('');
    const [selectDay,setSelectDay] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        user_ID: '',
        user_PWD: '',
        user_NICK: '',
        user_PHONE: '',
        user_BIRTH:'',
        category_NO:[],
        keyword_NO: [],
        user_EMAIL:''
    })
    const changeId = (e) => {
        const copy = { ...form, ['user_ID']: e.target.value };
        setForm(copy);
        setIdCheck(false);
        setIdMsg('');
    }

    const checkId = async (e) => { 
        e.preventDefault();
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
            const copy = { ...form, ['user_PWD']: e.target.value };
            setForm(copy);
        } else {
            setPwCheckMsg('비밀번호가 다릅니다.');
        }
    }

    const checkNick = async (e) => {
        e.preventDefault();
        const nick = document.querySelector(".regist-nick").value;
        const response = await axios.post('/book/checkDuplicateNick', {nick});
        if (response.data) {
            setNickMsg('사용 가능한 닉네임입니다.');
            setNickCheck(true);
            const copy = { ...form, ['user_NICK']: nick};
            setForm(copy);
        } else {
            setNickMsg('중복된 닉네임입니다.');
        }
    }

    const changeNick = () => {
        setNickCheck(false);
        setNickMsg('');
    }

    const handleSelectChange = (event) => {
        setEmailCheck(false);
        setSelectedDomain(event.target.value);
    }
    const emailAuth = async (e) => {
        e.preventDefault();
        const area = document.querySelector(".authen");
        area.style.display = "block";
        const id = document.querySelector(".regist-mail").value;
        const email = id + '@' + selectedDomain;
        setEmail(email);
        const copy = { ...form, ['user_EMAIL']: email};
        setForm(copy);
        const response = await axios.post('/book/regist/sendMail', {email});
        setCode(response.data);
    }

    const codeCheck = (e) => {
        e.preventDefault();
        const codeInput = document.querySelector(".code-input").value;
        if (codeInput === code) {
            alert('인증이 완료됐습니다.');
            const area = document.querySelector(".authen");
            area.style.display = "none";
            setEmailCheck(true);
        } else {
            alert('인증에 실패했습니다.');
        }
    }

    // 이미지 변경 핸들러
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
    };

    const handleRedirect = () => {
        // 회원가입 성공 시 '/' 경로로 이동
        navigate("/login");
    };

    const handleRegist = async (e) => {

        e.preventDefault();
        const isValid = pwd.length >= 10 && /[0-9]/.test(pwd) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);
        const phoneNo = document.querySelector(".phone-one").value + "-" + document.querySelector(".phone-two").value + "-" + document.querySelector(".phone-three").value;
        const birth = selectYear+"-"+selectMonth+"-"+selectDay;
        const nick = document.querySelector(".regist-nick").value;
        const phonePattern = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
        if (!idCheck) {
            alert('아이디 중복체크를 해주세요.');
        }else if (!isValid){
            alert('사용 불가능한 비밀번호입니다.\n비밀번호는 10자 이상이어야 하고,\n숫자와 특수문자를 반드시 포함해야 합니다.');
        }else if(pwd !== pwd2){
            alert('비밀번호 확인이 일치하지 않습니다.');
        }else if(!nickCheck){
            alert('닉네임 중복체크를 해주세요.');
        }else if(!phonePattern.test(phoneNo)){
            alert('유효하지 않은 전화번호입니다.')
        }else if(!emailCheck){
            alert('이메일 인증은 필수입니다!');
        }else if(selectYear===''){
            alert('생년월일을 선택해주세요 : 년도 미선택');
        }else if(selectMonth===''){
            alert('생년월일을 선택해주세요 : 월 미선택');
        }else if(selectDay===''){
            alert('생년월일을 선택해주세요 : 일 미선택');
        }else if (selectedCategories.length === 0) {
            alert('선호하는 카테고리를 1개 이상 선택해주세요.');
        }else if (selectedKeywords.length === 0) {
            alert('선호하는 키워드를 1개 이상 선택해주세요.');
        }else {
            const formData = new FormData();
            let copy;
            if(profileImage!=null){
                formData.append('profileImage', profileImage);
                try {
                    const fileResponse = await axios.post('/book/file/profile', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }); 
                    // 파일 업로드가 성공한 경우, 업로드된 파일의 URL을 PROFILE_URL에 할당
                    copy = {
                        ...form,
                        'profile_URL': fileResponse.data,
                        'user_PHONE': phoneNo,
                        'user_BIRTH': birth,
                        'category_NO': selectedCategories.join(','),
                        'keyword_NO': selectedKeywords.join(',')
                    };
                    
                } catch (error) {
                    console.error('프로필 이미지 업로드 오류:', error);
                }
            }else{
                copy = {
                    ...form,
                    'profile_URL': 'https://bookbuddytoy-bucket.s3.ap-northeast-2.amazonaws.com/no-profile.jpg',
                    'user_PHONE': phoneNo,
                    'user_BIRTH': birth,
                    'category_NO': selectedCategories.join(','),
                    'keyword_NO': selectedKeywords.join(',')
                };
            }
            
            const response = await axios.post('/book/join', JSON.stringify(copy), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data) {
                alert('회원가입 성공! 반갑습니다 ' + nick + '님! \n로그인 후 서비스 이용 부탁드립니다!');
                handleRedirect();
            } else {
                alert('회원가입 실패');
            }
        }

    }

    return (
        <div className="registContent">
            <div className="logo-regist">
                <img src={process.env.PUBLIC_URL + "/imgs/logo-notext.png"} alt="Logo"/>
            </div>
            <form id="joinForm" onSubmit={handleRegist} action='/book/join' method="post">
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
                    <input className="regist-input regist-pw2" type={showPassword2 ? 'text' : 'password'}
                           placeholder="비밀번호를 한번 더 입력해주세요"
                           autoComplete="current-password" onChange={pwCheck}/>
                    <FontAwesomeIcon icon={showPassword2 ? faEyeSlash : faEye}
                                     className="password-toggle-icon2"
                                     onClick={togglePasswordVisibility2}/>
                </div>
                <p className='msg pwCheckMsg'>{pwCheckMsg}</p>
                <p className="regist-p">닉네임 </p>
                <input className="regist-input-id regist-nick" type="text" placeholder="닉네임을 입력해주세요"
                       autoComplete="username"
                       onChange={changeNick} />
                <button className="id-check" onClick={checkNick}>중복확인</button>
                <p className='msg nickNameMsg'>{nickMsg}</p>
                <div>
                    <p className="regist-p">휴대전화</p>
                    <input type="text" className="phone-input phone-input-first phone-one"></input>{" "}-                   
                    <input type="text" className="phone-input phone-two"></input> -
                    <input type="text" className="phone-input phone-three"></input>
                </div>
                <p className='msg'></p>
                <p className="regist-p">이메일 </p>
                <input className="regist-input regist-mail" type="text" placeholder="이메일을 입력해주세요"
                       autoComplete="username" onChange={(e) => setEmailCheck(false)}/>@
                <select className='mail-select' defaultValue={selectedDomain} onChange={handleSelectChange}>
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
                <button className='email-auth' onClick={emailAuth}>인증번호발송</button>
                <div className='authen' style={{display: 'none'}}>
                    <p className='msg'></p>
                    <p className="regist-p">인증번호</p>
                    <input className="regist-input regist-email code-input" placeholder='이메일로 발송된 인증번호를 입력해주세요.'/>
                    <button className="id-check code-check" onClick={codeCheck}>인증하기</button>
                </div>
                <p className='msg'></p>
                <BirthDateSelect setSelectYear={setSelectYear} setSelectMonth={setSelectMonth}
                                 setSelectDay={setSelectDay}/>
                <p className='msg'></p>
                
                <div className='profile-upload-zone'>
                    <p className="regist-p profile-upload-p">프로필사진 </p>
                    <input type="file" accept="image/*" className='in-profile profile-upload-p' onChange={handleImageChange} />
                    {profileImage && (
                        <img src={URL.createObjectURL(profileImage)} alt="Profile" style={{ width: '160px'}} />
                    )}
                </div>
                
                <SelectCategory setSelectedCategories={setSelectedCategories}/>
                <p className='msg'></p>
                <SelectKeyword setSelectedKeywords={setSelectedKeywords}/>
                <p className='msg'></p>
                <button className="regist-btn" type="submit">
                    가입하기
                </button>
            </form>
        </div>
    );
}

function BirthYearSelect({ setSelectYear }) {
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

    const handleYearChange = (event) => {
        setSelectYear(event.target.value);
    };

    return (
        <select className="birth-box birth-year-box" id="birth-year" defaultValue={'출생 연도'}onChange={handleYearChange}>
            <option disabled>출생 연도</option>
            {birthYears.map(year => (
                <option className='birth-option' key={year} value={year}>{year}</option>
            ))}
        </select>
    );
}

function BirthMonthSelect({ setSelectMonth }) {
    const months = Array.from({length: 12}, (_, i) => i + 1); // 1부터 12까지 월 생성

    const handleMonthChange = (event) => {
        const selectedMonth = String(event.target.value).padStart(2, '0');
        setSelectMonth(selectedMonth);
    };

    return (
        <select className="birth-box" id="birth-month" defaultValue={'월'} onChange={handleMonthChange}>
            <option disabled>월</option>
            {months.map(month => (
                <option className='birth-option' key={month} value={month}>
                    {String(month).padStart(2, '0')}
                </option>
            ))}
        </select>
    );
}

function BirthDaySelect({setSelectDay}) {
    const days = Array.from({length: 31}, (_, i) => i + 1); // 1부터 31까지 일 생성

    const handleDayChange = (event) => {
        const selectedDay = String(event.target.value).padStart(2, '0');
        setSelectDay(selectedDay);
    };

    return (
        <select className="birth-box" id="birth-day" defaultValue={'일'} onChange={handleDayChange}>
            <option disabled>일</option>
            {days.map(day => (
                <option className='birth-option' key={day} value={day}>{String(day).padStart(2, '0')}</option>
            ))}
        </select>
    );
}

function BirthDateSelect({ setSelectYear, setSelectMonth, setSelectDay }) {
    return (
        <div>
            <p className="regist-p">생년월일</p>
            <BirthYearSelect setSelectYear={setSelectYear}/>
            <BirthMonthSelect setSelectMonth={setSelectMonth}/>
            <BirthDaySelect setSelectDay={setSelectDay}/>
        </div>
    );
}

export default UserRegist
