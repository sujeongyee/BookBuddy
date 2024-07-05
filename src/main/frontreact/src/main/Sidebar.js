import './sidebar.css';
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useUser } from '../context/UserContext';
import axios from 'axios';

function Sidebar(){

    const [showMenuCategory, setShowMenuCategory] = useState(false); // 카테고리 메뉴 전시 여부
    const [showMenuCategory2, setShowMenuCategory2] = useState(false); // 키워드 메뉴 전시 여부
    const navigate = useNavigate();
    const { userData ,setUserData} = useUser();
    const {userId, userNick,profileURL} = userData;
    const {id,setId} = useState('');
    const {nick,setNick} = useState('');
    const [profileImg,setProfileImg] = useState('');
    const [cateList,setCateList] = useState([]);
    const [kwdList,setKwdList] = useState([]);

    useEffect(()=>{
        const fetchData = async()=> {
            const response = await axios.get('/book/getMenu');
            setCateList(response.data.category);
            setKwdList(response.data.keyword);
        }
        fetchData();
    },[])

    const logout = () => {
        localStorage.removeItem("remeberId");
        localStorage.removeItem("userVO");
        sessionStorage.removeItem("userVO");
        setUserData({});
        navigate('/');
    }

    const clickCate = (cateNo) => {
        navigate(`/cateSearch/${cateNo}`);
    }
    const clickKwd = (kwdNo) => {
        navigate(`/kwdSearch/${kwdNo}`);
    }

    
    return(
        <div className="sidebar">
            <Link to="/" className="Logo">
                <img src={process.env.PUBLIC_URL + '/imgs/logo.png'} alt="Logo"/>
            </Link>
            {userId ? (
                <div className="myInfo">
                    <div className="myinfoP">
                        <p className="hellop"> {userNick} </p>
                        <p className="hellop2"> 님 반갑습니다!</p>
                    </div>
                    
                    <Link to="/myBook"><button className='my-feed'>My Book</button></Link>
                    <button className="logout-btn" onClick={logout}>로그아웃</button>
                </div>
            ) : (
                <div className="myLogin">
                    <Link to="/login" className="loginBtn">로그인하기</Link>
                    <Link to="/regist" className="registBtn">회원가입하기</Link>
                </div>
            )}
            <div className="menu">
                <ul>
                <li 
                    className="cateoryLi" 
                    onMouseEnter={() => setShowMenuCategory(true)}
                    onMouseLeave={() => setShowMenuCategory(false)}
                    >
                    <a className="cateoryA">카테고리 별 추천/리뷰</a>
                    
                    {showMenuCategory && (
                        <ul className="menuCategory2" onMouseEnter={() => setShowMenuCategory(true)}>
                            {cateList && cateList.map((cate, index) => (
                                index % 3 === 0 && index + 2 < cateList.length && (
                                    <li key={cate.category_NO}>
                                        <a onClick={()=>clickCate(cateList[index].category_NO)}>{cateList[index].category_NAME}</a>
                                        <a onClick={()=>clickCate(cateList[index+1].category_NO)}>{cateList[index + 1].category_NAME}</a>
                                        <a onClick={()=>clickCate(cateList[index+2].category_NO)}>{cateList[index + 2].category_NAME}</a>
                                    </li>
                                )
                            ))}
                        </ul>
                    
                    )}
                    </li>
                    <li 
                    className="cateoryLi" 
                    onMouseEnter={() => setShowMenuCategory2(true)}
                    onMouseLeave={() => setShowMenuCategory2(false)}
                    >
                    <a className="cateoryA">키워드 별 추천/리뷰</a>
                    {showMenuCategory2 && (
                        <ul className="menuCategory2" onMouseEnter={() => setShowMenuCategory2(true)}>
                            {kwdList && kwdList.map((kwd, index) => (
                                index % 3 === 0 && index + 2 < kwdList.length && (
                                    <li key={kwd.keyword_NO}>
                                        <a onClick={()=>clickKwd(kwdList[index].keyword_NO)}>{kwdList[index].keyword_NAME}</a>
                                        <a onClick={()=>clickKwd(kwdList[index+1].keyword_NO)}>{kwdList[index + 1].keyword_NAME}</a>
                                        <a onClick={()=>clickKwd(kwdList[index+2].keyword_NO)}>{kwdList[index + 2].keyword_NAME}</a>
                                    </li>
                                )
                            ))}
                        </ul>
                    
                    )}
                    </li>
                    <li className='cateoryLi'><a>이번 주 베스트 추천/리뷰</a></li>
                </ul>
            </div>

        </div>

    );
}

export default Sidebar