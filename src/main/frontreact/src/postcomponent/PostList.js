import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import toast, { Toaster } from 'react-hot-toast';
import "./postgrid.css";
import { useLoading } from "../context/LoadingContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from "@fortawesome/free-solid-svg-icons";
const PostList = ({type,userNo,writePostCheck}) => {
  const {userData ,setUserData} = useUser();
  const {userId} = userData;
  const [recommendPosts, setRecommendPosts] = useState([]);
  const [reviewPosts, setReviewPosts] = useState([]);
  const {showLoading,hideLoading} = useLoading();
  useEffect(() => { 
    const fetchData = async () => { 
      if(type === 'recommend') {
        try {
          showLoading();
          if(userNo!=null){
            const response = await axios.get(`/book/post/getRcmPostMyPage?id=${userNo}&type=list`);
            setRecommendPosts(response.data);
          }else{
            const response = await axios.get(`/book/post/getRcmPostMyPage?id=${userId}&type=list`);
            setRecommendPosts(response.data);
          }
          
          hideLoading();
        } catch(error) {
          console.error("추천글 가져오는 중 오류 발생", error);
        }
        hideLoading();
      } else {
        try {
          showLoading();
          if(userNo!=null){
            const response = await axios.get(`/book/post/getRvPostMyPage?id=${userNo}&type=list`);
            setReviewPosts(response.data);
          }else{
            const response = await axios.get(`/book/post/getRvPostMyPage?id=${userId}&type=list`);
            setReviewPosts(response.data);
          }
          hideLoading();
        } catch(error) {
          console.error("리뷰글 가져오는 중 오류 발생", error);
        }
        hideLoading();
      }
    };
    fetchData(); 

  }, [userId, type,writePostCheck]); 

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const posts = type === 'recommend' ? recommendPosts : reviewPosts;
  const tp = type === 'recommend' ? 'recommend' : 'review';
  return( 
    <div className="post-list-container"> 
      {posts.map(post => (
        <div className="post-list-item" key={post[type === 'recommend' ? 'recommend_NO' : 'review_NO']}>
          <a href={`post/${type === 'recommend' ? 'recommend' : 'review'}/${post[type === 'recommend' ? 'recommend_NO' : 'review_NO']}`} className="post-list-link">
            <div className="post-list-content">
              <img src={post.fileUrl? post.fileUrl : post.book_thumbnail} alt={post[type === 'recommend' ? 'recommend_BOOKTITLE' : 'review_BOOKTITLE']} className="post-list-img" />         
              <div className="post-list-header">
                <div className="post-list-title"> {`[ ${post[type === 'recommend' ? 'recommend_TITLE' : 'review_TITLE']} ]`}</div>
                <span className="post-list-time">작성일 : {formatDate(post[type === 'recommend' ? 'recommend_TIME' : 'review_TIME'])}</span>
                <span className="post-list-postContent">내용 : {post[type === 'recommend' ? 'recommend_CONTENT' : 'review_CONTENT'].length > 20 
                  ? `${post[type === 'recommend' ? 'recommend_CONTENT' : 'review_CONTENT'].substring(0, 20)}...` 
                  : post[type === 'recommend' ? 'recommend_CONTENT' : 'review_CONTENT']}</span>
                <div className="iconZone">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff9797" className="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                  </svg>
                  <span className="post-list-likes">{post.likeCnt}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff9797" className="bi bi-chat-fill" viewBox="0 0 16 16">
                    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"/>
                  </svg>
                  <span className="post-list-comments"><i className="fas fa-comment"></i> {post.cmtCnt}</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  )
  
}
export default PostList;
