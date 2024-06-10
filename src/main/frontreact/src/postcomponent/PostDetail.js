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
  const { userId, userNick, profileURL } = userData;
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

  useEffect(() => {
    
    const fetchPostDetail = async () => {
      try {
        showLoading();
        const response = await axios.get(`/book/post/postDetail?type=${type}&postNo=${postNo}`);
        console.log(response);

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
              <button onClick={prevImage}>{`<--`}</button>
              
              <img className="postDetailImg" src={fileList[currentImageIndex].file_url} alt={`Image ${currentImageIndex + 1}`} />
              
              <button onClick={nextImage}>{`-->`}</button>
            </div>
            )}
            <div className='postDetailContentWrapper'>
              <p className='postDetailContent'>{post ? post.recommend_CONTENT || post.review_CONTENT : ''}</p>
            </div>
            
            {reviewVO && <p><strong>Rating:</strong> {reviewVO.review_RATING}</p>}
            
            <div className="postStats">
              <span onClick={likeList.includes(userId) ? handleUnlike : handleLike}>
                {likeList.includes(userId) ? "👎" : "👍"} {likeCnt}
              </span>
              <span>💬 {cmtCnt}</span>
            </div>
          </div>
          <div className="commentsSection">
            <h2>Comments</h2>
            {cmtList.map(comment => (
              <div key={comment.comment_no} className="comment">
                <p><strong>User {comment.user_no}:</strong> {comment.comment_content}</p>
                <p><small>{new Date(comment.comment_date).toLocaleString()}</small></p>
              </div>
            ))}
            <form onSubmit={handleCommentSubmit} className="commentForm">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>)}
      </div>
    </div>
  )
}
export default PostDetail;
