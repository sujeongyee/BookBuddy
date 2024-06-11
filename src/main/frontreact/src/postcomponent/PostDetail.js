import './postdetail.css';
import { useParams } from 'react-router-dom';
import Sidebar from '../main/Sidebar';
import Header from '../main/Header';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useLoading } from "../context/LoadingContext";

const PostDetail = ({}) => {
  const { type, postNo } = useParams();
  const { userData } = useUser();
  const { userId, userNo } = userData;
  const {showLoading,hideLoading} = useLoading();
  const [cmtCnt, setCmtCnt] = useState(0);
  const [likeCnt, setLikeCnt] = useState(0);
  const [cmtList, setCmtList] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const [recommendVO, setRecommendVO] = useState(null);
  const [reviewVO, setReviewVO] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [fileList,setFileList] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [likeCheck,setLikeCheck] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response2 = await axios.get(`/book/post/likeCheck?postNo=${postNo}&userNo=${userNo}&type=${type}`);
        setLikeCheck(response2.data);
        
      } catch (error) {
        console.error("좋아요 여부 불러오는 도중 오류 발생", error);
      }
      
    }
    if(userNo){
      fetchData();
    }
    
  },[userNo])

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        showLoading();
        const response = await axios.get(`/book/post/postDetail?type=${type}&postNo=${postNo}`);
        setCmtCnt(response.data.cmtCnt);
        setLikeCnt(response.data.likeCnt);
        setLikeList(response.data.likeList);
        setCmtList(response.data.cmtList);
        setFileList(response.data.fileList);
        if (response.data.recommendVO !== null) {
          setRecommendVO(response.data.recommendVO);
        } else {
          setReviewVO(response.data.reviewVO);
        }
        setLoading(false);
        hideLoading();
      } catch (error) {
        hideLoading();
        console.error("글 내용 불러오는 도중 오류 발생", error);
      }
    };

    fetchPostDetail();
  }, [type, postNo]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`/book/post/like`, { postNo, userId });
      setLikeCnt(response.data.likeCnt);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await axios.post(`/book/post/unlike`, { postNo, userId });
      setLikeCnt(response.data.likeCnt);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/book/post/comment`, { postNo, userId, comment: newComment });
      setCmtList([...cmtList, response.data.comment]);
      setCmtCnt(cmtCnt + 1);
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % fileList.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? fileList.length - 1 : prevIndex - 1));
  };

  const post = recommendVO || reviewVO;

  return (
    <div className="mainContainer">
      <div className="side">
        <Sidebar />
      </div>
      <div className="mainContent2">
        <Header />
        {!loading && (
        <div className="mainSection">
          <div className="postDetailContainer">
            <h1>{post ? post.recommend_TITLE || post.review_TITLE : ''}</h1>
            <p>{post ? 
              (post.recommend_CATEGORY2 || post.review_CATEGORY2)
                .split(',')
                .map((category, index) => (
                  <span key={index} className="PostcategoryTag">{category.trim()}</span>
                )) 
              : ''}
              {post ? 
              (post.recommend_KEYWORD2 || post.review_KEYWORD2)
                .split(',')
                .map((keyword, index) => (
                  <span key={index} className="PostKeywordTag">{keyword.trim()}</span>
                )) 
              : ''}
            </p>

            {/* <p><strong>Keywords:</strong> {post ? post.recommend_KEYWORD || post.review_KEYWORD : ''}</p> */}
            <p><strong>책 이름 : </strong> {post ? post.recommend_BOOKTITLE || post.review_BOOKTITLE : ''}</p>
            {fileList.length > 0 && (
            <div className="postImageSlider">
              {fileList.length > 1 && (
                <button onClick={prevImage}>{`<--`}</button>
              )}
              <img className="postDetailImg" src={fileList[currentImageIndex].file_url} alt={`Image ${currentImageIndex + 1}`} />
              {fileList.length > 1 && (
                <button onClick={nextImage}>{`-->`}</button>
              )}
            </div>
            )}
            <div className='postDetailContentWrapper'>
              <p className='postDetailContent'>{post ? post.recommend_CONTENT || post.review_CONTENT : ''}</p>
            </div>
            
            {reviewVO && <p><strong>Rating:</strong> {reviewVO.review_RATING}</p>}
            
            <div className="postStats">
              <span>
                이 게시글에 공감해요 
                {likeCheck ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff9797" className="bi bi-heart-fill postHeart" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                  </svg>
                ) : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart postHeart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
              </svg>}
                
                
              </span>
              <span className='postStatsSpan'>{likeCnt}</span>
              {/* <span onClick={likeList.includes(userId) ? handleUnlike : handleLike}>
                {likeList.includes(userId) ? "👎" : "👍"} {likeCnt}
              </span> */}
            </div>
          </div>
          <div className="commentsSection">
            <h2>댓글 ({cmtCnt})</h2>
            {cmtList.map(comment => (
              <div key={comment.comment_no} className="comment">
                <p><strong>User {comment.user_no}:</strong> {comment.comment_content}</p>
                <p><small>{new Date(comment.comment_date).toLocaleString()}</small></p>
              </div>
            ))}
            <form onSubmit={handleCommentSubmit} className="commentForm">
              <textarea
                value={newComment}
                className='postDetailCommentText'
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글 내용을 작성해주세요."
                required
              />
              <button type="submit">작성하기</button>
            </form>
          </div>
        </div>)}
      </div>
    </div>
  )
}
export default PostDetail;
