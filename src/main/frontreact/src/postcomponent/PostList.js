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

  const posts = type === 'recommend' ? recommendPosts : reviewPosts;
  const tp = type === 'recommend' ? 'recommend' : 'review';
  return( 
    <div className="post-list-container">
      {posts.map((post) => (
        <div className="post-item" key={post[type === 'recommend' ? 'recommend_NO' : 'review_NO']}>
          <a href={`/${type === 'recommend' ? 'recommendPost' : 'reviewPost'}/${post[type === 'recommend' ? 'recommend_NO' : 'review_NO']}`} className="post-link">
              <div className="post-content">
              <h3 className="post-title2">{post[type === 'recommend' ? 'recommend_TITLE' : 'review_TITLE']}</h3>
              <p className="post-description">{post[type === 'recommend' ? 'recommend_CONTENT' : 'review_CONTENT']}</p>
              <p className="post-category">{post[type === 'recommend' ? 'recommend_CATEGORY' : 'review_CATEGORY']}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  )
}
export default PostList;
