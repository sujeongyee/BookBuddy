import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './mybook.css';
import { useUser } from "../context/UserContext";
import SelectCategory from "../component/SelectCategory";
import SelectKeyword from "../component/SelectKeyword";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastMsg from "../main/ToastMsg";
import Header from "../main/Header";
import Sidebar from "../main/Sidebar";
import SearchBook from "./SearchBook.js";

const WritePosts = ({ type, rcmVO, rvVO,}) => {
  const { userData } = useUser();
  const { userId ,userNo} = userData;
  const navigate = useNavigate();
  
  const [postTitle, setPostTitle] = useState(""); 
  const [postType, setPostType] = useState(""); 
  const [bookTitle, setBookTitle] = useState(""); 
  const [bookTitleCheck,setBookTitleCheck] = useState(false);
  const [postContent, setPostContent] = useState(""); 
  const [rating, setRating] = useState(0); 
  const [bookImages, setBookImages] = useState([]); 
  const [selectedImage, setSelectedImage] = useState(""); 
  const [uploadFiles, setUploadFiles] = useState([]); 
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [componentMsg, setComponentMsg] = useState('이 책의 ');
  const [isEditing, setIsEditing] = useState(false);
  const [postId, setPostId] = useState(null);
  const [searchModalIsOpen,setSearchModalIsOpen] = useState(false);
  const [modalStatus,setModalStatus] = useState('off');
  const [selectBook,setSelectBook] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  useEffect(()=>{
    console.log(selectBook);
  },[selectBook])

  useEffect(() => {
    if (type === 'recommend' && rcmVO) {
      setIsEditing(true);
      setPostType('recommendation');
      setPostId(rcmVO.recommend_NO);
      setPostTitle(rcmVO.recommend_TITLE);
      setBookTitle(rcmVO.recommend_BOOKTITLE);
      setPostContent(rcmVO.recommend_CONTENT);
      setSelectedCategories(rcmVO.recommend_CATEGORY.split(','));
      setSelectedKeywords(rcmVO.recommend_KEYWORD.split(','));
    } else if (type === 'review' && rvVO) {
      setIsEditing(true);
      setPostType('review');
      setPostId(rvVO.review_NO);
      setPostTitle(rvVO.review_TITLE);
      setBookTitle(rvVO.review_BOOKTITLE);
      setPostContent(rvVO.review_CONTENT);
      setRating(rvVO.review_RATING);
      setSelectedCategories(rvVO.review_CATEGORY.split(','));
      setSelectedKeywords(rvVO.review_KEYWORD.split(','));
    } else {
      setIsEditing(false);
      resetForm();
    }
  }, [type, rcmVO, rvVO]);

  const resetForm = () => {
    setPostTitle("");
    setPostType("");
    setBookTitle("");
    setPostContent("");
    setRating(0);
    setBookImages([]);
    setSelectedImage("");
    setUploadFiles([]);
    setSelectedCategories([]);
    setSelectedKeywords([]);
  };

  ///////////////// 게시글 등록
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 필수 입력 항목 검사
    if (postType === '') {
      alert('게시글의 유형을 선택해주세요');
      return;
    }
    if (postTitle === '') {
      alert('게시글 제목을 입력해주세요.');
      return;
    }
    if (bookTitle === '') {
      alert('책 제목을 입력해주세요.');
      return;
    }
    if (postContent.length < 10) {
      alert('게시글 내용을 10자 이상 입력해주세요.');
      return;
    }
    if (selectedCategories.length === 0) {
      alert('카테고리를 하나 이상 선택해주세요');
      return;
    }
    if (selectedKeywords.length === 0) {
      alert('키워드를 하나 이상 선택해주세요');
      return;
    }
  
    // FormData 초기화
    const formData = new FormData();
    let endpoint;
    formData.append('book_ISBN',selectBook.isbn);
    formData.append('book_THUMBNAIL',selectBook.thumbnail);
    if (postType === 'recommendation') {
      formData.append('recommend_TITLE', postTitle);
      formData.append('recommend_BOOKTITLE', bookTitle);
      formData.append('recommend_CONTENT', postContent);
      formData.append('recommend_CATEGORY', selectedCategories.join(','));
      formData.append('recommend_KEYWORD', selectedKeywords.join(','));
      formData.append('user_NO', userNo);
      endpoint = '/book/post/writeRecommendPost';
    } else { // postType === 'review'
      formData.append('review_TITLE', postTitle);
      formData.append('review_BOOKTITLE', bookTitle);
      formData.append('review_CONTENT', postContent);
      formData.append('review_CATEGORY', selectedCategories.join(','));
      formData.append('review_KEYWORD', selectedKeywords.join(','));
      formData.append('user_NO', userNo);
      formData.append('review_RATING', rating);
      endpoint = '/book/post/writeReviewPost';
    }
  
    try {
      // 게시글 등록 요청
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.data >= 0) {
        // 이미지 업로드
        const formDataImg = new FormData();
        let imgEndpoint = '/book/file/';
        console.log(response.data);
        if (postType === 'recommendation') {
          imgEndpoint += 'rcmImgUrlToFile';
          formDataImg.append('rcmNo', response.data);
        } else {
          imgEndpoint += 'rvImgUrlToFile';
          formDataImg.append('rvNo', response.data);
        }
  
        if (uploadFiles.length > 0) {
          uploadFiles.forEach((file) => {
            formDataImg.append('uploadFiles', file); // 파일들 추가
          });
        } else {
          formDataImg.append('uploadFiles', []);
        }
  
        // 이미지 업로드 요청
        const responseImg = await axios.post(imgEndpoint, formDataImg);
  
        if (responseImg.data === 'success') {

          if (postType === 'recommendation') setShowToast(true);
          else setShowToast2(true);
        }
      } else {
        alert('글을 등록하는 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error posting recommended images:', error);
      alert('글을 등록하는 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  
    // 페이지 이동
    navigate('/myBook');
  };
  

  

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleImageUpload = (files) => {
    if (files.length > 4 || uploadFiles.length >= 4) {
      alert("최대 4개의 이미지만 선택할 수 있습니다.");
      return;
    }
    const uploadedFiles = Array.from(files);
    setUploadFiles([...uploadFiles, ...uploadedFiles]);
  };

  const handleDeleteFile = (index) => {
    const newFiles = [...uploadFiles];
    newFiles.splice(index, 1);
    setUploadFiles(newFiles);
  };

  const changeContent = (e) => {
    if (e.target.value.length > 1000) {
      alert('게시글 내용은 1000자 이내로 작성해주세요.');
    } else {
      setPostContent(e.target.value);
    }
  };

  const searchBook = (e) => {
    e.preventDefault();
    setModalStatus('on');
    setSearchModalIsOpen(true);
  }

 


  return(
    <div className="mainContainer">
      <div className="side">
        <Sidebar />
      </div>
      <div className="mainContent2">
        <Header/>  
        {showToast && <ToastMsg prop="success" />}
        {showToast2 && <ToastMsg prop="success2" />}
        <div className="write-container">
          <div className="write-header">
            <h3 className="write-title">게시글 작성</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="write-form">
            <table className="write-table">
              <tbody>
                <tr className="write-row">
                  <td>
                    <label className="write-label">게시글 유형</label>
                  </td>
                  <td>
                    <div className="radio-buttons">
                      <label className={`radio-button ${postType === 'recommendation' ? 'selected' : ''}`}>
                        <input type="radio" value="recommendation" checked={postType === 'recommendation'} onChange={(e) => setPostType(e.target.value)}/>
                        추천
                      </label>
                      <label className={`radio-button ${postType === 'review' ? 'selected' : ''}`}>
                        <input type="radio" value="review" checked={postType === 'review'} onChange={(e) => setPostType(e.target.value)}/>
                        리뷰
                      </label>
                    </div>
                  </td>
                </tr>
                <tr className="modalWrite-row">
                  <td>
                    <label htmlFor="postTitle" className="modalWrite-label">게시글 제목</label>
                  </td>
                  <td>
                    <input type="text" id="postTitle" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} className="modalWrite-input modalWrite-inputTitle" placeholder="게시글 제목을 입력하세요."/>
                  </td>
                </tr>
                <tr className="modalWrite-row">
                  <td>
                    <label htmlFor="postBookTitle" className="modalWrite-label">책 제목</label>
                  </td>
                  <td>
                    <div className="modalWrite-searchContainer" style={{display: 'flex', flexDirection: 'row'}}>
                      <input type="text" style={{width: '75%'}} id="postBookTitle" value={bookTitle} onChange={(e) => {setBookTitle(e.target.value); setBookTitleCheck(false) }} className="modalWrite-input modalWrite-inputTitle" placeholder="책 제목을 입력하세요."/>
                      <button className="book-searchBtn" onClick={(e) => searchBook(e)}>검색하기</button>
                      <SearchBook isOpen={searchModalIsOpen} onRequestClose={() => { setSearchModalIsOpen(false); setModalStatus('off') ;}} bookTitle={bookTitle} status={modalStatus} bookSelect = {(e)=>setSelectBook(e)} bookCheck={()=>{setBookTitleCheck(true)}} />
                    </div>
                  </td>
                </tr>
                <tr className="modalWrite-row">
                  <td>
                    <label htmlFor="postContent" className="modalWrite-label">내용</label>
                  </td>
                  <td style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                    <textarea
                      id="postContent"
                      value={postContent}
                      onChange={changeContent}
                      className="modalWrite-input modalWrite-textarea write-text"
                      placeholder="게시글 내용을 입력하세요."
                    />
                    <span className="modalWrite-characterCount2">{postContent ? postContent.length : 0}/1000</span>
                  </td>
                </tr>
                {/* 리뷰일 경우 별점 입력 */}
                {/* 리뷰일 경우 별점 입력 */}
                {postType === 'review' && (
                  <tr className="modalWrite-row">
                    <td>
                      <label htmlFor="rating" className="modalWrite-label">별점</label>
                    </td>
                    <td>
                      <div>
                        {[...Array(5)].map((_, index) => {
                          const starValue = index + 1;
                          return (
                            <svg key={index} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={starValue <= rating ? "currentColor" : "none"} stroke="currentColor" className="bi bi-star star-rating" viewBox="0 0 22 23" onClick={() => handleRating(starValue)} style={{ cursor: 'pointer' }}>
                              <path fillRule="evenodd" d="M7.515.284a1 1 0 0 1 1.97 0l1.21 4.65a.5.5 0 0 0 .494.35h4.582a1 1 0 0 1 .773 1.654l-3.5 2.548a.5.5 0 0 0-.154.494l1.21 4.65a1 1 0 0 1-1.516 1.053L8 12.697l-3.395 2.287a1 1 0 0 1-1.516-1.054l1.21-4.65a.5.5 0 0 0-.154-.494l-3.5-2.548a1 1 0 0 1 .773-1.654h4.582a.5.5 0 0 0 .494-.35L7.515.284z"/>
                            </svg>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                )}
                <tr className="modalWrite-row">
                  <td>
                    <label  className="modalWrite-file">이미지첨부</label>
                  </td>
                  <td>
                    <label htmlFor="img-btn" className="label-img">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-folder" viewBox="0 0 16 16">
                        <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"/>
                      </svg>
                    </label>
                    <input type="file" id="img-btn" style={{ display: "none" }} multiple onChange={(e) => handleImageUpload(e.target.files)} accept="image/*"/>    
                    {/* <label className="label-img" onClick={handleSearchImages}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search imgSearch" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                      </svg>
                    </label> */}
                    
                  </td>
                </tr>
                          
              </tbody>       
            </table>
            <div>
            {/* 업로드된 파일들의 이름과 미리보기 */}
            <div style={{ display: "flex" ,width:"90%",alignItems: "center",gap:"10px" }}>
              <label>첨부 파일</label>
              {uploadFiles.map((file, index) => (
                <div key={index} style={{ position: "relative", marginRight: "15px" }}>
                  {/* 삭제 아이콘 */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" style={{ position: "absolute", top: "-2", right: "-4", zIndex: "1", cursor:"pointer"}} className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"
                    onClick={() => handleDeleteFile(index)}/>
                  </svg>
                  {/* 파일 미리보기 */}
                  <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} style={{ width: "90px", height: "90px" }}/>
                </div>
              ))}
            </div>
            <div>             
              {/* 이미지 표시 및 스타일링 */}
                {bookImages.map((image, index) => (
                  <img key={index} src={image} alt={`Book ${index + 1}`} onClick={() => setSelectedImage(image)} className="modalWrite-bookImage"/>
                ))}
            </div>
              {selectedImage && (
                <div className="modalWrite-selectImg">
                  <label className="modalWrite-label" style={{marginRight:'15px'}}>대표 이미지</label>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" style={{ position: "absolute", top: "5px", left: "190px", zIndex: "1", cursor:"pointer"}} className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"
                    onClick={() => setSelectedImage('')}/>
                  </svg>
                  <img src={selectedImage} alt="Selected Book" className="modalWrite-selectedImage" />                  
                </div>)}
            </div>      
            <div>
            <SelectCategory 
              setSelectedCategories={setSelectedCategories} 
              msg={componentMsg} 
              cate={(rcmVO?.recommend_CATEGORY || rvVO?.review_CATEGORY) || ''}
            />    
            <SelectKeyword 
              setSelectedKeywords={setSelectedKeywords} 
              msg={componentMsg} 
              kwd={(rcmVO?.recommend_KEYWORD || rvVO?.review_KEYWORD) || ''}
            />
            </div>
            {type ? (<button type="submit" className="modalWrite-submitButton">수정하기</button>):(<button type="submit" style={{marginTop: '20px'}}className="modalWrite-submitButton">작성하기</button>)}
            
          </form>               
      </div>
    </div>
  </div>
  )
}

export default WritePosts;
