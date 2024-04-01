import Sidebar from './Sidebar';
import Header from './Header';
import './sidebar.css';
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Main({ loginPage, registPage }){
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const response = await axios.post('/book/login', { "USER_ID": userid, "USER_PWD": password });
            if (response.data === 'success') {
                alert("로그인 성공");
                navigate('/');
            }
        } catch (error) {
            console.error('로그인 요청 에러:', error);
        }
    };
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
                        <div>
                            <p className= "login-p login-id">아이디 </p>
                            <input className= "login-input" type="text" placeholder="아이디를 입력해주세요" onChange={(e) => setUserid(e.target.value)}/>
                            <p className= "login-p">비밀번호</p>
                            <input className= "login-input" type="password" placeholder="비밀번호를 입력해주세요" onChange={(e) => setPassword(e.target.value)}/>
                            <button className="login-btn" onClick={handleLogin}>로그인</button>
                        </div>
                    </div>}
                {registPage && <h3>회원가입 페이지입니다.</h3>}
            </div>
        </div>
    );
}

export default Main