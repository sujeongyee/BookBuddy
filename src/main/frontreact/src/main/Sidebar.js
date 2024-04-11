import './sidebar.css';
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
function Sidebar(){

    const [showMenuCategory, setShowMenuCategory] = useState(false); // 카테고리 메뉴 전시 여부
    const [showMenuCategory2, setShowMenuCategory2] = useState(false); // 키워드 메뉴 전시 여부
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 저장
    const navigate = useNavigate();
    const [userId,setUserId] = useState(sessionStorage.getItem("userId"));
    const [userNick,setUserNick] = useState(sessionStorage.getItem("userNick"));

    useEffect(() => {
        setUserId(sessionStorage.getItem("userId"));
        setUserNick(sessionStorage.getItem("userNick"));
    }, [sessionStorage.getItem("userId"),sessionStorage.getItem("userNick")]);

    const logout = () => {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userNick");
        setIsLoggedIn(false);
        setUserId('');
        setUserNick('');
        navigate('/');
    }

    return(
        <div className="sidebar">
            <Link to="/" className="Logo">
                <img src={process.env.PUBLIC_URL + '/imgs/logo.png'} alt="Logo"/>
            </Link>
            {userId ? ( // 로그인 상태에 따라
                <div className="myInfo">
                    <div className="myinfoP"><p className="hellop"> {userNick} </p><p className="hellop2"> 님 반갑습니다!</p></div>

                    <button className="logout-btn" onClick={logout}>로그아웃하기</button>
                </div>
            ):(
                <div className="myLogin">
                    <Link to="/login" className="loginBtn">로그인하기</Link>
                    <Link to="/regist" className="registBtn">회원가입하기</Link>
                </div>
            )}
            <div className="menu">
            <ul>
                    <li className="cateoryLi" onMouseEnter={() => setShowMenuCategory(true)}
                        onMouseLeave={() => setShowMenuCategory(false)}>
                        <a className="cateoryA">카테고리 별 추천/리뷰</a>
                        {showMenuCategory && (
                            <ul className="menuCategory2">
                                <li><a>소설</a><a>시/에세이</a><a>인문</a></li>
                                <li><a>가정/육아</a><a>요리</a><a>건강</a></li>
                                <li><a>경제</a><a>자기계발</a><a>정치/사회</a></li>
                                <li><a>역사/문화</a><a>중/고등참고서</a></li>
                                <li><a>기술/공학</a><a>외국어</a><a>과학</a></li>
                                <li><a>취업/수험서</a><a>여행</a><a>컴퓨터/IT</a></li>
                            </ul>
                        )}
                    </li>
                    <li className="cateoryLi2" onMouseEnter={() => setShowMenuCategory2(true)}
                        onMouseLeave={() => setShowMenuCategory2(false)}>
                        <a className="cateoryA2">키워드 별 추천/리뷰</a>
                        {showMenuCategory2 && (
                            <ul className="menuCategory2">
                                <li><a>#힐링되는</a><a>#흥미진진</a><a>#스릴있는</a></li>
                                <li><a>#신선한</a><a>#가독성좋은</a><a>#공감되는</a></li>
                                <li><a>#유익한</a><a>#따뜻한</a><a>#선물하기좋은</a></li>
                                <li><a>#위로되는</a><a>#감동적인</a><a>#성공</a></li>
                                <li><a>#생각하게되는</a><a>#교훈있는</a><a>#눈물</a></li>
                                <li><a>#공포</a><a>#범죄</a><a>#추리</a></li>
                            </ul>
                        )}
                    </li>
                    <li><a>이번 주 베스트 추천/리뷰</a></li>

                </ul>
            </div>

        </div>

    );
}

export default Sidebar