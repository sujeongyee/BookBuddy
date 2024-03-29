import './sidebar.css';
import {useState} from "react";
function Sidebar(){
    const [showMenuCategory, setShowMenuCategory] = useState(false);
    return(
        <div className="sidebar">
            <div className="Logo">
                <img src={process.env.PUBLIC_URL + '/imgs/logo.png'} alt="Logo"/>
            </div>
            <div className="myLogin">
                <button className="loginBtn">로그인하기</button>
            </div>
            <div className="myInfo">

            </div>
            <div className="menu">
                <ul>
                    <li className="cateoryLi" onMouseEnter={() => setShowMenuCategory(true)} onMouseLeave={() => setShowMenuCategory(false)}>
                        <a className="cateoryA">카테고리 별 추천/리뷰</a>
                        {showMenuCategory && (
                            <div className="menuCategory">
                                <li><a>소설</a><a>시/에세이</a><a>인문</a></li>
                                <li><a>가정/육아</a><a>요리</a><a>건강</a></li>
                                <li><a>경제</a><a>자기계발</a><a>정치/사회</a></li>
                                <li><a>역사/문화</a><a>중/고등참고서</a></li>
                                <li><a>기술/공학</a><a>외국어</a><a>과학</a></li>
                                <li><a>취업/수험서</a><a>여행</a><a>컴퓨터/IT</a></li>
                            </div>
                        )}
                    </li>
                    
                    <li><a>키워드 별 추천</a></li>
                    <li><a>키워드 별 리뷰</a></li>
                </ul>
            </div>

        </div>

    );
}

export default Sidebar