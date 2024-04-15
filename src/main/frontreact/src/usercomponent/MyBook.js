import React, { useState, useEffect } from "react";
import "../main/sidebar.css";
import "./mybook.css";
import axios from "axios";
import { useUser } from "../context/UserContext";
import Sidebar from "../main/Sidebar";
import Header from "../main/Header";

function MyBook() {

  const {userData ,setUserData} = useUser();
  const {userId,userNick,profileURL} = userData;
  const [followerCount, setFollowerCount] = useState(100);
  const [followingCount, setFollowingCount] = useState(150);
  const [postCount, setPostCount] = useState(20);
  const [showReviews, setShowReviews] = useState(true);
  const [recommendPosts,setRecommendPosts] = useState([]);
  const [reviewPosts,setReviewPosts] = useState([]);

  const handleEditProfile = () => {
    console.log('프로필 편집 버튼 클릭');
  };

  const handleWritePost = () => {
    console.log('글 작성하기 버튼 클릭');
  };

  useEffect(()=>{
    const response = axios.get(`/book/user/myPage?id=${userId}`);
  },[])

  const [activeTab, setActiveTab] = useState('list'); // 'list' 또는 'grid'로 초기화

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mainContainer">
      <div className="side">
        <Sidebar />
      </div>
      <div className="mainContent2">
        <Header/>
        <div className="mainSection">
          <div className="user-profile">
            <div className="user-photo">
              {profileURL ? (
                <img className='profile-photo' src={profileURL} alt="profileImg"/>
              ) : (
                <img className='profile-photo' src={process.env.PUBLIC_URL + '/imgs/no-profile.jpg'} alt="profileImg"/>
              )}
            </div>           
            <div className="stat">
              <span className="count">{followerCount}</span>
              <span className="label">팔로워</span>
            </div>
            <div className="stat">
              <span className="count">{followingCount}</span>
              <span className="label">팔로잉</span>
            </div>
            <div className="stat">
              <span className="count">{postCount}</span>
              <span className="label">게시글</span>
            </div>           
          </div>
          <div className="action-buttons">
              <button className="edit-profile-button" onClick={handleEditProfile}>프로필 수정</button>
              <button className="write-post-button" onClick={handleWritePost}>글 작성하기</button>
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
                      <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                    </svg>                                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className={`bi bi-grid ${activeTab === 'grid' ? 'active' : ''}`} onClick={() => handleTabClick('grid')} viewBox="0 0 16 16">
                      <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"/>
                    </svg>                 
                </div>
              </div>
              <div className="feed-content">              
                {showReviews ? (
                  reviewPosts && reviewPosts.length > 0 ? (
                    <div>
                      {/* 리뷰 게시글 목록을 렌더링하는 코드 */}
                    </div>
                  ) : (
                    <div className="no-post">
                      <p>등록된 리뷰 게시글이 없습니다.</p>
                    </div>
                  )
                ) : (
                  recommendPosts && recommendPosts.length > 0 ? (
                  <div>

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
        </div>
      </div>
    </div>
  );
}
export default MyBook;
