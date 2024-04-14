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
            <div className="feed-content">
              {showReviews ? (
                reviewPosts && reviewPosts.length > 0 ? (
                  <div>
                    {/* 리뷰 게시글 목록을 렌더링하는 코드 */}
                  </div>
                ) : (
                  <div>
                    <p>등록된 리뷰 게시글이 없습니다.</p>
                  </div>
                )
              ) : (
                recommendPosts && recommendPosts.length > 0 ? (
                <div>

                </div>
                ) : (
                <div>
                  <p>등록된 추천 게시글이 없습니다.</p>
                </div>
                )
                
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyBook;
