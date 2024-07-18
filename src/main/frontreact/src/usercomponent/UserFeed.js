import { useParams } from 'react-router-dom';
import Sidebar from '../main/Sidebar';
import Header from '../main/Header';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useLoading } from "../context/LoadingContext";
import { useNavigate } from 'react-router-dom';
import PostGrid from "../postcomponent/PostGrid";
import PostList from "../postcomponent/PostList";
import FollowModal from './FollowModal';
import './mybook.css';

const UserFeed = () => {
  const { userNo } = useParams();
  const {userData} = useUser();
  const {userId,userNick,profileURL} = userData;
  const navigate = useNavigate();
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [showReviews, setShowReviews] = useState(false);
  const [profilemodalIsOpen, setProfileModalIsOpen] = useState(false);
  const [vo,setVo] = useState(null);
  const [writemodalIsOpen,setWriteModalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('list'); // 'list' 또는 'grid'로 초기화
  const [rcmCnt,setRcmCnt] = useState(0);
  const [rvCnt,setRvCnt] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [showToast2,setShowToast2] = useState(false);
  const {showLoading,hideLoading} = useLoading();
  const [followmodalIsOpen,setFollowModalIsOpen] = useState(false); // 팔로우,팔로잉 모달
  const [mode, setMode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedNick,setFeedNick] = useState('');
  const [profileImg,setProfileImg] = useState('');
  const [followCheck,setFollowCheck] = useState(false);

  useEffect(()=>{
    if(userId===userNo){
      navigate('/myBook');
    }
  },[userNo])

  useEffect(() => {
    const fetchData = async () => { 
      try {
        showLoading();
        const response = await axios.get(`/book/user/myPage?id=${userId}`);
        const response2 = await axios.get(`/book/user/checkFollow?id=${userId}&toUserNo=${userNo}`);
        if(response2.data){
          setFollowCheck(true);
        }
        
        const vo = response.data.vo;
        setProfileImg(vo.profile_URL);
        setFeedNick(vo.user_NICK);
        setFollowerCount(response.data.follower);
        setFollowingCount(response.data.following);
        setVo(vo);
        hideLoading(); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        hideLoading();
        setLoading(false);
      }
    };
    const fetchPost = async () => {
        try {
          const response = await axios.get(`/book/user/getPosts?id=${userNo}`);
          const rcmCnt2 = response.data.recommendPostCount;
          const rvCnt2 = response.data.reviewPostCount;
          setPostCount(rcmCnt2+rvCnt2);
          setRcmCnt(rcmCnt2);
          setRvCnt(rvCnt2);
        } catch (error) {
          console.error('게시글 가져오기 오류',error);
        }
      
      
    }
    fetchPost();
    fetchData();
    
  }, [userNo]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const followModalOpen = (mode) => {
    setMode(mode);
    setFollowModalIsOpen(true);
  }

  const doFollow = async () => {
    const isConfirmed = window.confirm('팔로우 하시겠습니까?');
    if (isConfirmed) {
      try {
        const no = await axios.get(`/book/user/getUserNo?id=${userNo}`);
        const noUser = no.data;
        const response = await axios.get(`/book/user/addFollow?id=${userId}&toUserNo=${noUser}`);
        if (response.data == 1) {
          setFollowCheck(true);
          setFollowerCount(followerCount+1);
        }
      } catch (error) {
        console.error('팔로우 하는 도중 오류 발생:', error);
      }
    }
  }

  const resetFollow = async () => {
    const isConfirmed = window.confirm('팔로우 취소하시겠습니까?');
    if (isConfirmed) {
      try {
        const no = await axios.get(`/book/user/getUserNo?id=${userNo}`);
        const noUser = no.data;
        const response = await axios.get(`/book/user/cancelFollow?id=${userId}&toUserNo=${noUser}`);
        if (response.data == 1) {
          setFollowCheck(false);
          setFollowerCount(followerCount-1);
        }
      } catch (error) {
        console.error('팔로우 취소 하는 도중 오류 발생', error);
      }
    }
  }

  return(
    <div className="mainContainer">
      <div className="side">
        <Sidebar />
      </div>
      <div className="mainContent2">
        <Header/>
        {!loading && (
        <div className="mainSection">
          <div className="user-profile">
            <div className="user-photo">
              {profileImg ? (
                <img className='profile-photo' src={profileImg} alt="profileImg"/>
              ) : (
                <img className='profile-photo' src={process.env.PUBLIC_URL + '/imgs/no-profile.jpg'} alt="profileImg"/>
              )}
              {/* {userNick} */}
              <p style={{fontSize:'12px',color:'gray'}}>{feedNick}</p>
            </div>           
            <div className="stat">
              <span className="count followCnt" onClick={()=>{followModalOpen('follower')}}>{followerCount}</span>
              <FollowModal isOpen={followmodalIsOpen} onRequestClose={()=>{setFollowModalIsOpen(false)}} mode={mode} userNo={userNo}/>
              <span className="label">팔로워</span>
            </div>
            <div className="stat">
              <span className="count followCnt" onClick={()=>{followModalOpen('following')}}>{followingCount}</span>
              <span className="label">팔로잉</span>
            </div>
            <div className="stat">
              <span className="count">{postCount}</span>
              <span className="label">게시글</span> 
            </div>           
          </div>
          <div className="action-buttons">
            <button className='edit-profile-button'>버디톡보내기</button>
            {followCheck?(<button className='cancelFollow' onClick={() => resetFollow()}>팔로우취소하기</button>):(<button className='doFollow' onClick={() => doFollow()}>팔로우하기</button>)}
          </div>
          <div className="feed-container">
            <div className="feed-tabs">
              <button className={`feed-tab ${!showReviews ? "active" : ""}`} onClick={() => setShowReviews(false)}>
                추천글 보기
              </button>
              <button className={`feed-tab tab-second ${showReviews ? "active" : ""}`} onClick={() => setShowReviews(true)} >
                리뷰글 보기                
              </button>
            </div>
            <div className="my-Feed" style={{display:'flex',flexDirection: 'column'}}>
              <div className="my-icon-zone">
                <div></div>
                <div className="list-icon">                 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className={`bi bi-list-ul ${activeTab === 'list' ? 'active' : ''}`} onClick={() => handleTabClick('list')} viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                    </svg>                                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className={`bi bi-grid ${activeTab === 'grid' ? 'active' : ''}`} onClick={() => handleTabClick('grid')} viewBox="0 0 16 16">
                      <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"/>
                    </svg>                 
                </div>
              </div>
              <div className="feed-content">              
                {showReviews ? (
                  rvCnt > 0 ? (
                    <div>
                      {activeTab=='grid'?(<PostGrid type='review' userNo={userNo}/>):(<PostList type='review' userNo={userNo}/>)}
                    </div>
                  ) : (
                    <div className="no-post">
                      <p>등록된 리뷰 게시글이 없습니다.</p>
                    </div>
                  )
                ) : (
                  rcmCnt> 0 ? (
                  <div>
                    {activeTab=='grid'?(<PostGrid type='recommend' userNo={userNo}/>):(<PostList type='recommend' userNo={userNo}/>)}
                  </div>
                  ) : (
                  <div className="no-post">
                    <p>등록된 추천 게시글이 없습니다.</p>
                  </div>
                  )                  
                )}
              </div>
            </div>
          
          </div>
        </div> )} 
      </div>
    </div>
  )
}
export default UserFeed