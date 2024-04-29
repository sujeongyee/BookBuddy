import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import toast, { Toaster } from 'react-hot-toast';
import "./postgrid.css";
const PostList = ({type}) => {
  const {userData ,setUserData} = useUser();
  const {userId} = userData;
  const [recommendPosts, setRecommendPosts] = useState([]);
  const [reviewPosts, setReviewPosts] = useState([]);

  useEffect(() => { 
    const fetchData = async () => { 
      console.log(type);
      if(type === 'recommend') {
        try {
          const response = await axios.get(`/book/post/getRcmPostMyPage?id=${userId}&type=list`);
          console.log(response.data);
          setRecommendPosts(response.data);
        } catch(error) {
          console.error("추천글 가져오는 중 오류 발생", error);
        }
      } else {
        try {
          const response = await axios.get(`/book/post/getRvPostMyPage?id=${userId}&type=list`);
          console.log(response.data);
          setReviewPosts(response.data);
        } catch(error) {
          console.error("리뷰글 가져오는 중 오류 발생", error);
        }
      }
    };
    fetchData(); 

  }, [userId, type]); 

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
        <div className="post-item" key={post[type === 'recommend' ? 'recommend_NO' : 'review_NO']}>
          <a href={`/${type === 'recommend' ? 'recommendPost' : 'reviewPost'}/${post[type === 'recommend' ? 'recommend_NO' : 'review_NO']}`} className="post-link">
            <div className="post-list-title">{post[type === 'recommend' ? 'recommend_TITLE' : 'review_TITLE']}</div>
            <div className="post-book-title">{post[type === 'recommend' ? 'recommend_BOOKTITLE' : 'review_BOOKTITLE']}</div>
            <div className="post-details">
              <span className="post-time">{formatDate(post[type === 'recommend' ? 'recommend_TIME' : 'review_TIME'])}</span>
              <span className="post-likes">좋아요 수: {post.likeCnt}</span>
              <span className="post-comments">댓글 수: {post.cmtCnt}</span>
              {/* 여기에 필요한 다른 정보 추가 */}
            </div>
          </a>
        </div>
      ))}
    </div>
  )
}
export default PostList;
