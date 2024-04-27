
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import "./postgrid.css";
const PostGrid = ({type}) => {
  const {userData ,setUserData} = useUser();
  const {userId,userNick,profileURL} = userData;
  const [rcmPosts,setRcmPosts] = useState([]);
  const [rvPosts,setRvPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => { 
      console.log(type);
      if(type === 'recommend') {
        try {
          const response = await axios.get(`/book/post/getRcmPostMyPage?id=${userId}&type=grid`);
          setRcmPosts(response.data);
        } catch(error) {
          console.error("추천글 가져오는 중 오류 발생", error);
        }
      } else if(type ==='review'){
        try {
          const response = await axios.get(`/book/post/getRvPostMyPage?id=${userId}&type=grid`);
          setRvPosts(response.data);
        } catch(error) {
          console.error("리뷰글 가져오는 중 오류 발생", error);
        }
      }
    };
    fetchData(); 

  }, [userId, type]); 


  return( 
    <div className="post-grid-container">
      {type==='recommend' && rcmPosts && rcmPosts.map((post) => (
        <img key={post.recommend_no} src={post.file_url} alt={post.book_title} className="post-img" />
      ))}
      {type==='review' && rvPosts && rvPosts.map((post) => (
        <img key={post.review_no} src={post.file_url} alt={post.book_title} className="post-img" />
      ))}
    </div>
  )

}
export default PostGrid