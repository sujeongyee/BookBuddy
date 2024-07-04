import './postdetail.css';
import { useParams, useHistory } from 'react-router-dom';
import Sidebar from '../main/Sidebar';
import Header from '../main/Header';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useLoading } from "../context/LoadingContext";
import ToastMsg from '../main/ToastMsg';
import { useNavigate } from 'react-router-dom';
import WritePost from '../usercomponent/WritePost';

const PostDetail = ({}) => {
  const { type, postNo } = useParams();
  const { userData } = useUser();
  const { userId, userNo } = userData;
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  const [cmtCnt, setCmtCnt] = useState(0);
  const [likeCnt, setLikeCnt] = useState(0);
  const [cmtList, setCmtList] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const [recommendVO, setRecommendVO] = useState(null);
  const [reviewVO, setReviewVO] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [fileList, setFileList] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [likeCheck, setLikeCheck] = useState(false);
  const [writer, setWriter] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [modifyModalIsOpen, setModifyModalIsOpen] = useState(false);
  const [editMode, setEditMode] = useState({});
  const [editContent, setEditContent] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await axios.get(`/book/post/likeCheck?postNo=${postNo}&userNo=${userNo}&type=${type}`);
        setLikeCheck(response2.data);
      } catch (error) {
        console.error("좋아요 여부 불러오는 도중 오류 발생", error);
      }
    }
    if (userNo) {
      fetchData();
    }
  }, [userNo]);

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
          setWriter(response.data.recommendVO.user_NO);
        } else {
          setReviewVO(response.data.reviewVO);
          setWriter(response.data.reviewVO.user_NO);
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
    if (writer == userNo) {
      setToastMessage('myPostLike');
      setTimeout(() => {
        setToastMessage('');
      }, 2000);
      return;
    }
    try {
      const response = await axios.post(`/book/post/doLike`, { postNo, userNo, type });
      if (response.data > 0) {
        setLikeCnt(likeCnt + 1);
        setLikeCheck(true);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await axios.post(`/book/post/cancelLike`, { postNo, userNo, type });
      if (response.data > 0) {
        setLikeCnt(likeCnt - 1);
        setLikeCheck(false);
      }
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    if (window.confirm("댓글을 작성하시겠습니까?")) {
      e.preventDefault();
      try {
        const response = await axios.post(`/book/post/comment`, { postNo, userNo, type, comment: newComment });
        setToastMessage('doComment');
        setTimeout(() => {
          setToastMessage('');
        }, 2000);
        setCmtList([...cmtList, response.data]);
        setCmtCnt(cmtCnt + 1);
        setNewComment("");
      } catch (error) {
        console.error("댓글 작성 중 오류 발생", error);
      }
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % fileList.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? fileList.length - 1 : prevIndex - 1));
  };

  const toUserFeed = (user_id) => {
    if(user_id===userId){
      navigate('/myBook');
    }else{
      navigate(`/userFeed/${user_id}`);
    }
    
  };

  const modifyPost = () => {
    if (type === 'review') {
      navigate('/modifyPost', { state: { reviewVO, type, fileList } });
    } else {
      navigate('/modifyPost', { state: { recommendVO, type, fileList } });
    }
  };

  const deletePost = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?\n게시글을 삭제하면 관련된 이미지 파일, 댓글이 모두 삭제됩니다.')) {
      try {
        for (const file of fileList) {
          await axios.delete(`/book/file/postImgDelete`, {
            data: {
              fileNo: file.file_no,
              url: file.file_url
            }
          });
        }
        await axios.delete('/book/post/deletePost', {
          params: { postNo: postNo, type: type }
        });
        setToastMessage('deletePost');
        setTimeout(() => {
          setToastMessage('');
          navigate('/myBook');
        }, 1000);
      } catch (error) {
        console.error("게시글 삭제 중 오류 발생", error);
      }
    }
  };

  const deleteComment = async (commentNo) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/book/post/deleteComment?commentNo=${commentNo}`);
        setToastMessage('deleteComment');
        setTimeout(() => {
          setToastMessage('');
        }, 2000);
        setCmtList(prevList => prevList.filter(comment => comment.comment_no !== commentNo));
      } catch (error) {
        console.error("댓글 삭제 중 오류 발생", error);
      }
    }
  };

  const modifyComment = async (commentNo, editContent, index) => {
    try {
      const response = await axios.post(`/book/post/modifyComment`, { commentNo, editContent });
      setToastMessage('modifyComment');
      setTimeout(() => {
        setToastMessage('');
      }, 2000);
      setCmtList(prevList => prevList.map(comment =>
        comment.comment_no === commentNo ? { ...comment, comment_content: editContent } : comment
      ));
    } catch (error) {
      console.error("댓글 수정 중 오류 발생", error);
    }
  };

  const handleEditClick = (comment_no, comment_content) => {
    setEditMode(prev => ({ ...prev, [comment_no]: true }));
    setEditContent(prev => ({ ...prev, [comment_no]: comment_content }));
  };

  const handleCancelEdit = (comment_no) => {
    setEditMode(prev => ({ ...prev, [comment_no]: false }));
    setEditContent(prev => ({ ...prev, [comment_no]: '' }));
  };

  const handleSaveEdit = (comment_no) => {
    if (window.confirm('댓글을 수정하시겠습니까?')) {
      modifyComment(comment_no, editContent[comment_no]);
      setEditMode(prev => ({ ...prev, [comment_no]: false }));
    }
  };

  const post = recommendVO || reviewVO;

  

  return (
    <div className="mainContainer">
      <div className="side">
        <Sidebar />
      </div>
      <div className="mainContent2">
        <Header />
        {toastMessage && <ToastMsg prop={toastMessage} />}
        
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
            {fileList.length > 0 ? (
              <div className="postImageSlider">
                {fileList.length > 1 && (
                  <button onClick={prevImage}>{`<--`}</button>
                )}
                <img className="postDetailImg" src={fileList[currentImageIndex].file_url} alt={`Image ${currentImageIndex + 1}`} />
                {fileList.length > 1 && (
                  <button onClick={nextImage}>{`-->`}</button>
                )}
              </div>
            ):(
              <div>
                {post.book_THUMBNAIL && (
                  <div className="postImageSlider">
                    <img className="postDetailImg" src={post.book_THUMBNAIL} alt={`Image ${post.book_ISBN}`} />
                  </div>
                )}
              </div>
              
            )}
            <div className='postDetailContentWrapper'>
              <p className='postDetailContent'>{post ? post.recommend_CONTENT || post.review_CONTENT : ''}</p>
            </div>
            {/* 별점 생성해줘  */}
            {/* {reviewVO && <p><strong>Rating:</strong> {reviewVO.review_RATING}</p>} */}
            {type === 'review' && (
                  <div>
                    <div className="mb-2">
                      <StarRating rating={reviewVO.review_RATING}  />
                    </div>
                  </div>
                )}
            
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={starValue <= rating ? "currentColor" : "none"} stroke="currentColor" className="bi bi-star star-rating" viewBox="0 0 22 23" onClick={() => handleRating(starValue)} style={{ cursor: 'pointer' }}>
              <path fillRule="evenodd" d="M7.515.284a1 1 0 0 1 1.97 0l1.21 4.65a.5.5 0 0 0 .494.35h4.582a1 1 0 0 1 .773 1.654l-3.5 2.548a.5.5 0 0 0-.154.494l1.21 4.65a1 1 0 0 1-1.516 1.053L8 12.697l-3.395 2.287a1 1 0 0 1-1.516-1.054l1.21-4.65a.5.5 0 0 0-.154-.494l-3.5-2.548a1 1 0 0 1 .773-1.654h4.582a.5.5 0 0 0 .494-.35L7.515.284z"/>
            </svg> */}
                         
            <div className="postStats">
              <span onClick={likeCheck?handleUnlike:handleLike}>
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
            </div>
            {writer==userNo && (
              <div className='post-work'><span onClick={()=>modifyPost()}>수정하기</span><span onClick={()=>deletePost()}>삭제하기</span></div>
            )}
            <WritePost isOpen={modifyModalIsOpen} onRequestClose={()=>{setModifyModalIsOpen(false)}} type={type} rcmVO={recommendVO} rvVO = {reviewVO}></WritePost>
          </div>
          <div className="commentsSection">
            <h2>댓글 ({cmtCnt})</h2>
            {cmtList.map(comment => (
              <div key={comment.comment_no} className="comment">
                <div className='commentHeader2'>
                  <div className="commentHeader">
                    {comment.profile_url && <img src={comment.profile_url} onClick={() => toUserFeed(comment.user_id)} alt="Profile" className="profileImg" />}
                    <p onClick={() => toUserFeed(comment.user_id)}><strong>{comment.user_nick} {comment.user_id === userId && ('(글쓴이)')}</strong></p>
                  </div>
                  {editMode[comment.comment_no] ? (
                    <div>
                      <textarea value={editContent[comment.comment_no]} className="comment-edit"
                      onChange={(e) => setEditContent(prev => ({ ...prev, [comment.comment_no]: e.target.value }))}/>
                      <div className='comment-btn'>
                        <button onClick={() => handleSaveEdit(comment.comment_no)} className="comment-save" >수정 완료</button>
                        <button onClick={() => handleCancelEdit(comment.comment_no)}className="comment-cancel">취소</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className='comment-content'>{comment.comment_content}</p>
                    </>
                  )}
                </div>
                <p><small>{new Date(comment.comment_date).toLocaleString()}</small></p>
                {comment.user_id === userId && (
                  <div className='comment-work'>
                    <span onClick={() => handleEditClick(comment.comment_no, comment.comment_content)}>수정하기</span> |
                    <span onClick={() => deleteComment(comment.comment_no)}>삭제하기</span>
                  </div>
                )}
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

// 별점 표시를 위한 컴포넌트
const StarRating = ({ rating, handleRating }) => {
  const totalStars = 5; // 전체 별 개수

  // 1부터 5까지의 숫자 배열 생성
  const stars = Array.from({ length: totalStars }, (_, index) => index + 1);

  return (
    <div className='detail-ratingzone'>
      {stars.map((starValue) => (
        <svg
          key={starValue}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill={starValue <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          className="bi bi-star star-rating"
          viewBox="0 0 22 23"
          // style={{ cursor: 'pointer' }}
        >
          <path
            fillRule="evenodd"
            d="M7.515.284a1 1 0 0 1 1.97 0l1.21 4.65a.5.5 0 0 0 .494.35h4.582a1 1 0 0 1 .773 1.654l-3.5 2.548a.5.5 0 0 0-.154.494l1.21 4.65a1 1 0 0 1-1.516 1.053L8 12.697l-3.395 2.287a1 1 0 0 1-1.516-1.054l1.21-4.65a.5.5 0 0 0-.154-.494l-3.5-2.548a1 1 0 0 1 .773-1.654h4.582a.5.5 0 0 0 .494-.35L7.515.284z"
          />
        </svg>
      ))}
    </div>
  );
};
export default PostDetail;
