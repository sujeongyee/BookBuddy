import React, { useState, useEffect } from "react";
import axios from "axios";

function NotLoginPosts() {
  const [showRecommend, setShowRecommend] = useState(true);
  const [reviewPosts, setReviewPosts] = useState([]);
  const [recommendPosts, setRecommendPosts] = useState([]);
  const [reviewPage, setReviewPage] = useState(1);
  const [recommendPage, setRecommendPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/book/post/getNotLogin?reviewPage=${reviewPage}&recommendPage=${recommendPage}`
        );
        console.log(response);
        // setPosts(prevPosts => [...prevPosts, ...response.data]);
        // setLoading(false);
      } catch (error) {
        console.error("데이터 가져오기 에러:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [reviewPage, recommendPage]);

  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      if(showRecommend){
        setRecommendPage((prevPage) => prevPage + 1);
      }else{
        setReviewPage((prevPage) => prevPage + 1);
      }
      
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="main-content">
      <div>
        <div className="main-toggle">
          <button className={`toggle-btn first-toggle ${showRecommend ? 'toggle-active' : ''}`} onClick={() => setShowRecommend(true)}>추천글 보기</button>
          <button className={`toggle-btn ${!showRecommend ? 'toggle-active' : ''}`} onClick={() => setShowRecommend(false)}>리뷰글 보기</button>
        </div>
        <div>{showRecommend ? <div>추천</div> : <div>리뷰</div>}</div>
      </div>
    </div>
  );
}
export default NotLoginPosts;
