
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
      if(type === 'recommend') {
        try {
          const response = await axios.get(`/book/post/getRcmPostMyPage?id=${userId}&type=grid`);
          console.log(response.data)
          setRcmPosts(response.data);
        } catch(error) {
          console.error("추천글 가져오는 중 오류 발생", error);
        }
      } else {
        try {
          const response = await axios.get(`/book/post/getrvPostMyPage?id=${userId}&type=grid`);
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
      {rcmPosts && rcmPosts.map((post) => (
        <img key={post.recommend_no} src={post.file_url} alt={post.title} className="post-img" />
      ))}
    </div>
  )

}
export default PostGrid