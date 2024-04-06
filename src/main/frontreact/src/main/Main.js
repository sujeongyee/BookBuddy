import Sidebar from './Sidebar';
import Header from './Header';
import './sidebar.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Main({ loginPage, registPage }){

    const sessionStorage = window.sessionStorage;
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user_id = document.querySelector(".login-input").value;

            const response = await axios.post('/book/login', { "USER_ID": user_id, "USER_PWD": password });
            if (response.data === 'success') {
                sessionStorage.setItem("userId", user_id);
                setUserid(user_id);
                alert("로그인 성공");
                navigate('/');
            }else {
                alert("로그인 실패! 다시 시도해주세요");
            }
        } catch (error) {
            console.error('로그인 요청 에러:', error);
        }
    };

    const handleRegist = async(e) => {
        e.preventDefault();
    }

    return(
        <div className="mainContainer">
            <div className="side">
                <Sidebar/>
            </div>
            <div className="mainContent">
                <Header/>
                <h3></h3>
                {loginPage &&
                    <div className="loginContent">
                        <div className="logo-login">
                            <img src={process.env.PUBLIC_URL + '/imgs/logo-notext.png'} alt="Logo"/>
                        </div>
                        <form onSubmit={handleLogin}>
                            <p className="login-p login-id">아이디 </p>
                            <input className="login-input" type="text" placeholder="아이디를 입력해주세요" autoComplete="username"/>
                            <p className="login-p">비밀번호</p>
                            <input className="login-input" type="password" placeholder="비밀번호를 입력해주세요"
                                   onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"/>
                            <button className="login-btn" type="submit">로그인</button>
                        </form>
                    </div>}
                {registPage && 
                    <div className="registContent">
                        <div className="logo-login">
                            <img src={process.env.PUBLIC_URL + '/imgs/logo-notext.png'} alt="Logo"/>
                        </div>
                        <form onSubmit={handleRegist}>
                            <p className="regist-p">아이디 </p>
                            <input className="regist-input-id" type="text" placeholder="아이디를 입력해주세요" autoComplete="username"/>
                            <button className='id-check'>중복확인</button>
                            <p className="regist-p">비밀번호</p>
                            <input className="regist-input" type="password" placeholder="비밀번호를 입력해주세요" autoComplete="current-password"/>
                            <p className="regist-p">확인</p>
                            <input className="regist-input" type="password" placeholder="비밀번호를 한번 더 입력해주세요" autoComplete="current-password"/>
                            <p className="regist-p">닉네임 </p>
                            <input className="regist-input-id" type="text" placeholder="닉네임을 입력해주세요" autoComplete="username"/>
                            <button className='id-check'>중복확인</button>
                            <p className="regist-input">전화번호</p>
                            <p className="regist-p">이메일 </p>
                            <input className="regist-input" type="text" placeholder="이메일을 입력해주세요" autoComplete="username"/>
                            <button className="login-btn" type="submit">가입하기</button>
                        </form>
                    </div>
                }
                
            </div>
        </div>
    );
}

export default Main