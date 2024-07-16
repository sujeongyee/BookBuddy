import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './sidebar.css';
import './main.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserRegist from '../component/UserRegist';
import { useUser } from '../context/UserContext';
import NotLoginPosts from '../postcomponent/NotLoginPosts';
import ToastMsg from "./ToastMsg";
import LoginPosts from '../postcomponent/LoginPosts';
import ListType from '../search/ListType';


function Main({ loginPage, registPage }) {

    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {userData ,setUserData} = useUser();
    const {userId, userNick,profileURL} = userData;
    const [rememberId,setRemeberId] = useState(localStorage.getItem("remeberId"));
    const [loginChecked,setLoginChecked] = useState(false);
    const [showToast, setShowToast] = useState(false);
    

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user_id = document.querySelector(".login-input").value;
            const checkedId = document.getElementById("rememberId").checked;
            const checkedAuto = document.getElementById("autoLogin").checked;
            const response = await axios.post('/book/login', { "USER_ID": user_id, "USER_PWD": password });
            if (response.data !== 'fail') { //userId && userNick && profileURL
                setUserData({ userId: response.data.user_ID, userNick: response.data.user_NICK, profileURL: response.data.profile_URL});
                sessionStorage.setItem("userVO",JSON.stringify(response.data));
                localStorage.removeItem("userVO");
                if(checkedAuto){
                    localStorage.setItem("userVO",JSON.stringify(response.data));
                }else if(checkedId){
                    localStorage.setItem("remeberId",response.data.user_ID);
                }
                setShowToast(true);
                navigate('/');
            } else {
                alert("로그인 실패! 다시 시도해주세요");
            }
        } catch (error) {
            console.error('로그인 요청 에러:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!loginPage && !registPage) {
                    if (userId === '') {
                        const response = await axios.get('/book/post/getNotLogin');
                    } 
                }
            } catch (error) {
                console.error('데이터 가져오기 에러:', error);
            }
        };
    
        fetchData();
    }, [userId, loginPage, registPage]);

    useEffect(()=>{
        const rememberId = localStorage.getItem("remeberId");     
        setRemeberId(rememberId);
    },[localStorage.getItem("remeberId")])
    

    return (
        <div className="mainContainer">
            <div className="side">
                <Sidebar />
            </div>
            <div className="mainContent">
                <Header />
                {!loginPage && !registPage && !userId &&
                    <NotLoginPosts/>    
                }
                {!loginPage && !registPage && userId &&
                    <LoginPosts/>    
                }               
                {showToast && <ToastMsg prop="loginSuccess" />}
                {loginPage &&
                    <div className="loginContent">
                        <div className="logo-login">
                            <img src={process.env.PUBLIC_URL + '/imgs/logo-notext.png'} alt="Logo" />
                        </div>
                        <form onSubmit={handleLogin}>
                            <p className="login-p login-id">아이디 </p>
                            <input className="login-input" type="text" defaultValue={rememberId} placeholder="아이디를 입력해주세요" autoComplete="username" />
                            <p className="login-p">비밀번호</p>
                            <input className="login-input" type="password" placeholder="비밀번호를 입력해주세요"
                                onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
                            <div className='login-checkbox'>
                                <input type = "checkbox" id='rememberId'/>
                                <label htmlFor="rememberId">아이디 기억하기</label>
                                <input type = "checkbox" id='autoLogin'/>
                                <label htmlFor='autoLogin'>자동 로그인</label>
                            </div>
                            
                            <button className="login-btn" type="submit">로그인</button>
                        </form>
                    </div>}
                {registPage &&
                    <UserRegist/>
                }
            </div>
        </div>
    );
}



export default Main;
