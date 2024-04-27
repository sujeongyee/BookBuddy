import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import toast, { Toaster } from 'react-hot-toast';

const PostList = ({type}) => {
  const {userData ,setUserData} = useUser();
  const {userId} = userData;
  const [rcmPosts,setRcmPosts] = useState([]);
  const [rvPosts,setRvPosts] = useState([]);
  useEffect(() => { 
    const fetchData = async () => { 
      if(type === 'recommend') {
        try {
          const response = await axios.get(`/book/post/getRcmPostMyPage?id=${userId}&type=list`);
          setRcmPosts(response.data);
        } catch(error) {
          console.error("추천글 가져오는 중 오류 발생", error);
        }
      } else {
        try {
          const response = await axios.get(`/book/post/getrvPostMyPage?id=${userId}`);
          setRvPosts(response.data);
        } catch(error) {
          console.error("리뷰글 가져오는 중 오류 발생", error);
        }
      }
    };
    fetchData(); 

  }, [userId, type]); 

  return(
    <div>
      
    </div>
  )
}
export default PostList