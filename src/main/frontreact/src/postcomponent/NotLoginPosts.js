import React, { useState, useEffect } from "react";
import axios from "axios";
import '../main/main.css';
import Loading from "../main/Loading";
import { useLoading } from "../context/LoadingContext";
function NotLoginPosts() {
  const [showRecommend, setShowRecommend] = useState(true);
  const [reviewPosts, setReviewPosts] = useState([]);
  const [recommendPosts, setRecommendPosts] = useState([]);
  const [reviewPage, setReviewPage] = useState(0);
  const [recommendPage, setRecommendPage] = useState(0);
  const {showLoading,hideLoading} = useLoading();


  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoading();
        const response = await axios.get(
          `/book/post/getNotLogin?reviewPage=${reviewPage}&recommendPage=${recommendPage}`
        );
        if(showRecommend && reviewPosts.length==0 && recommendPosts.length==0 && reviewPage==0){
          setRecommendPosts(prevPosts => [...prevPosts, ...response.data.recommendList]);
          setReviewPosts(prevPosts => [...prevPosts, ...response.data.reviewList]);
        }else if(showRecommend){
          setRecommendPosts(prevPosts => [...prevPosts, ...response.data.recommendList]);
        }else if(!showRecommend){          
          setReviewPosts(prevPosts => [...prevPosts, ...response.data.reviewList]);
        }
        hideLoading();
      } catch (error) {
        console.error("데이터 가져오기 에러:", error);
        hideLoading();
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
    if (scrollTop + clientHeight >= scrollHeight - 20 ) {  
      if (showRecommend) {
        setRecommendPage(prevPage => prevPage + 1);
      } else {
        setReviewPage(prevPage => prevPage + 1);
      }
    }
}

useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
}, [showRecommend]);

  return (
    
    <div className="main-content">      
    
      <div>
        <div className="main-toggle">
          <button className={`toggle-btn first-toggle ${showRecommend ? 'toggle-active' : ''}`} onClick={() => setShowRecommend(true)}>추천글 보기</button>
          <button className={`toggle-btn ${!showRecommend ? 'toggle-active' : ''}`} onClick={() => setShowRecommend(false)}>리뷰글 보기</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div></div>
          <p style={{ fontSize: '13px',color:'red' }}>* 비로그인 상태에서는 인기글을 표시합니다.</p>
        </div>
        <div className="post-zone">
          {showRecommend ? (
            <div >
              {recommendPosts.length > 0 ? (
                <div>
                  {recommendPosts.map((post) => (
                    <div key={post.recommend_NO} className="post-card">
                      <h3 className="post-title">{post.recommend_TITLE}</h3>
                      <div className="post-details">
                        <p className="post-user">작성자: {post.user_NO}</p>
                        <p className="post-content">{post.recommend_CONTENT}</p>
                        <p className="post-time">게시 시간: {post.recommend_TIME}</p>
                        <p className="post-like">좋아요: {post.recommend_LIKE}</p>
                        <p className="post-category">카테고리: {post.recommend_CATEGORY}</p>
                        <p className="post-keyword">키워드: {post.recommend_KEYWORD}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>추천글이 없습니다.</div>
              )}
            </div>
          ) : (
            <div>
              {reviewPosts.length > 0 ? (
                <div>
                  {reviewPosts.map((post) => (
                    <div key={post.review_NO} className="post-card">
                      <h3 className="post-title">{post.review_TITLE}</h3>
                      <div className="post-details">
                        <p className="post-user">작성자: {post.user_NO}</p>
                        <p className="post-content">{post.review_CONTENT}</p>
                        <p className="post-time">게시 시간: {post.review_TIME}</p>
                        <p className="post-like">좋아요: {post.review_LIKE}</p>
                        <p className="post-category">카테고리: {post.review_CATEGORY}</p>
                        <p className="post-keyword">키워드: {post.review_KEYWORD}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>리뷰가 없습니다.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotLoginPosts;
