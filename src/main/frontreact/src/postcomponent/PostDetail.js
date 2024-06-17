import './postdetail.css';
import { useParams, useHistory} from 'react-router-dom';
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
  const {showLoading,hideLoading} = useLoading();
  const navigate = useNavigate();

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
  const [writer,setWriter] = useState('');
  const [showToast,setShowToast] = useState(false);
  const [showToast2,setShowToast2] = useState(false);
  const [showToast3,setShowToast3] = useState(false);
  const [modifyModal,setModifyModal] = useState(false);
  const [modifyModalIsOpen,setModifyModalIsOpen] = useState(false);
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
    if(writer==userNo){
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return;
    }
    try {
      const response = await axios.post(`/book/post/doLike`, { postNo, userNo, type}); 
      if(response.data>0) {
        setLikeCnt(likeCnt+1);
        setLikeCheck(true);
      }
      
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await axios.post(`/book/post/cancelLike`, { postNo, userNo, type });
      if(response.data>0) {
        setLikeCnt(likeCnt-1);
        setLikeCheck(false);
      }
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    if(window.confirm("댓글을 작성하시겠습니까?")){
      e.preventDefault();
    try {
      const response = await axios.post(`/book/post/comment`, { postNo, userNo, type, comment: newComment });
      setShowToast2(true);
      setTimeout(() => {
        setShowToast2(false);
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

  const toUserFeed = (user_id) =>{
    navigate(`/userFeed/${user_id}`);
  }

  const modifyPost = () =>{
    if(type==='review'){
      navigate('/modifyPost',{ state:{reviewVO,type,fileList}});
    }else{
      navigate('/modifyPost', { state:{recommendVO,type,fileList}});
    }
    
  }
  const deletePost = async() =>{
    if(window.confirm('게시글을 삭제하시겠습니까?\n게시글을 삭제하면 관련된 이미지 파일, 댓글이 모두 삭제됩니다.')){
      try {
        // for (const file of fileList) {
        //   await axios.delete(`/book/file/postImgDelete`, {
        //     data: {
        //       fileNo: file.file_no,
        //       url: file.file_url
        //     }
        //   });
        // }
        await axios.delete('/book/post/deletePost', {
          params: { postNo: postNo,type: type}
        });
        setShowToast3(true);
        setTimeout(() => {
          setShowToast3(false);
          navigate('/myBook');
        }, 1000);
      } catch (error) {
        
      }
    }
  }
  const deleteComment = (commentNo) => {
    console.log(commentNo);
  }
  const modifyComment = async(commentNo,editContent) => {
    try {
      const response = await axios.post(`/book/post/modifyComment`, { commentNo, editContent });
      
    } catch (error) {
      console.error("댓글 수정 중 오류 발생", error);
    }
  }
  const handleEditClick = (comment_no, comment_content) => {
    setEditMode(prev => ({ ...prev, [comment_no]: true }));
    setEditContent(prev => ({ ...prev, [comment_no]: comment_content }));
  };

  const handleCancelEdit = (comment_no) => {
    setEditMode(prev => ({ ...prev, [comment_no]: false }));
    setEditContent(prev => ({ ...prev, [comment_no]: '' }));
  };

  const handleSaveEdit = (comment_no) => {
    modifyComment(comment_no, editContent[comment_no]);
    setEditMode(prev => ({ ...prev, [comment_no]: false }));
  };
    

  const post = recommendVO || reviewVO;

  return (
    <div className="mainContainer">
      <div className="side">
        <Sidebar />
      </div>
      <div className="mainContent2">
        <Header />
        {showToast && <ToastMsg prop="myPostLike" />}
        {showToast2 && <ToastMsg prop="doComment" />}
        {showToast3 && <ToastMsg prop="deletePost"/>}
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
            
            {reviewVO && <p><strong>Rating:</strong> {reviewVO.review_RATING}</p>}
            
            <div className="postStats">
              <span>
                이 게시글에 공감해요 
                {likeCheck ? (
                  <svg onClick={handleUnlike}xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff9797" className="bi bi-heart-fill postHeart" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                  </svg>
                ) : <svg onClick={handleLike} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart postHeart" viewBox="0 0 16 16">
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
                  <div className="commentHeader" onClick={() => toUserFeed(comment.user_id)}>
                    {comment.profile_url && <img src={comment.profile_url} alt="Profile" className="profileImg" />}
                    <p><strong>{comment.user_nick} {comment.user_id === userId && ('(글쓴이)')}</strong></p>
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
export default PostDetail;
