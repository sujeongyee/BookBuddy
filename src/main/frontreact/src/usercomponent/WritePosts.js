import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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
import { useLocation } from 'react-router-dom';

const WritePosts = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useUser();
  const { userId ,userNo} = userData;
  
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
  const [searchModalIsOpen,setSearchModalIsOpen] = useState(false);
  const [modalStatus,setModalStatus] = useState('off');
  const [selectBook,setSelectBook] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  
  const postData = location.state || {};
  const { type,recommendVO,reviewVO,fileList } = postData;
  const [fileLists,setFileLists] = useState([]);
  const vo = type=='review'? reviewVO:recommendVO;


  useEffect(() => {
    if(type) {
      setFileLists(fileList);
      console.log(fileList);
    }
    if (type === 'review') {
      setPostTitle(reviewVO.review_TITLE);
      setPostType('review');
      setBookTitle(reviewVO.review_BOOKTITLE);
      setPostContent(reviewVO.review_CONTENT);
      setRating(reviewVO.review_RATING);
      setSelectedCategories(reviewVO.review_CATEGORY.split(','));
      setSelectedKeywords(reviewVO.review_KEYWORD.split(','));
      setBookTitleCheck(true);
    } else if (type === 'recommend') {
      setPostTitle(recommendVO.recommend_TITLE);
      setPostType('recommend');
      setBookTitle(recommendVO.recommend_BOOKTITLE);
      setPostContent(recommendVO.recommend_CONTENT);
      setSelectedCategories(recommendVO.recommend_CATEGORY.split(','));
      setSelectedKeywords(recommendVO.recommend_KEYWORD.split(','));
      setBookTitleCheck(true);
    }
  }, [postData]);


  // const resetForm = () => {
  //   setPostTitle("");
  //   setPostType("");
  //   setBookTitle("");
  //   setPostContent("");
  //   setRating(0);
  //   setBookImages([]);
  //   setSelectedImage("");
  //   setUploadFiles([]);
  //   setSelectedCategories([]);
  //   setSelectedKeywords([]);
  // };

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
    if(!bookTitleCheck){
      alert('책을 검색해서 해당 되는 책을 선택해주세요');
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
    if (postType === 'recommend') {
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
        if (postType === 'recommend') {
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

          if (postType === 'recommend') setShowToast(true);
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

  const handleModify = async(e) => {
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
    if(!bookTitleCheck){
      alert('책을 검색해서 해당 되는 책을 선택해주세요');
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
    // 여기서 원래 vo 값, 이미지 값이랑 지금 값을 비교를 해서 똑같으면 '변경 사항이 없습니다' 띄워줘야 하고
    // 변경 사항이 있다면 vo는 update
    // 이미지는 원래 있다가 없어진 이미지는 url delete 작업
    // 추가된 이미지는 insert 작업 해줘야해
    // 



    const originalData = {
      book_ISBN: vo.book_ISBN,
      book_THUMBNAIL: vo.book_THUMBNAIL,
      title: type === 'recommend' ? vo.recommend_TITLE : vo.review_TITLE,
      bookTitle: type === 'recommend' ? vo.recommend_BOOKTITLE : vo.review_BOOKTITLE,
      content: type === 'recommend' ? vo.recommend_CONTENT : vo.review_CONTENT,
      categories: type === 'recommend' ? vo.recommend_CATEGORY.split(',') : vo.review_CATEGORY.split(','),
      keywords: type === 'recommend' ? vo.recommend_KEYWORD.split(',') : vo.review_KEYWORD.split(','),
      rating: type === 'review' ? vo.review_RATING : null
    };

    const isModified = (
      originalData.title !== postTitle ||
      originalData.bookTitle !== bookTitle ||
      originalData.content !== postContent ||
      JSON.stringify(originalData.categories) !== JSON.stringify(selectedCategories) ||
      JSON.stringify(originalData.keywords) !== JSON.stringify(selectedKeywords) ||
      (postType === 'review' && originalData.rating !== rating) 
    );
    const isModified2 = (fileList.length !== fileLists.length || 
      !fileList.every((file, index) => file.file_no === fileLists[index].file_no));

    if (!isModified && !isModified2) {
      alert('수정 사항이 없습니다.');
      return;
    }
    //게시글 수정
    if(isModified){
      const formData = new FormData();
      let endpoint;
      
      if(originalData.bookTitle!==bookTitle){
        formData.append('book_ISBN', selectBook.isbn);
        formData.append('book_THUMBNAIL', selectBook.thumbnail);
        
      }else{
        formData.append('book_ISBN', vo.isbn);
        formData.append('book_THUMBNAIL', vo.thumbnail);
      }
      if (postType === 'recommend') {
        formData.append('recommend_NO',vo.recommend_NO);
        formData.append('recommend_TITLE', postTitle);
        formData.append('recommend_BOOKTITLE', bookTitle);
        formData.append('recommend_CONTENT', postContent);
        formData.append('recommend_CATEGORY', selectedCategories.join(','));
        formData.append('recommend_KEYWORD', selectedKeywords.join(','));
        formData.append('user_NO', userNo);
        
        endpoint = '/book/post/modifyRecommendPost';
      } else { // postType === 'review'
        formData.append('review_NO',vo.review_NO);
        formData.append('review_TITLE', postTitle);
        formData.append('review_BOOKTITLE', bookTitle);
        formData.append('review_CONTENT', postContent);
        formData.append('review_CATEGORY', selectedCategories.join(','));
        formData.append('review_KEYWORD', selectedKeywords.join(','));
        formData.append('user_NO', userNo);
        formData.append('review_RATING', rating);
        endpoint = '/book/post/modifyReviewPost';
      }

      try {
        const response = await axios.post(endpoint, formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if(response.data>0){
          console.log("수정 성공");
        }
       
      } catch (error) {
        console.error('수정 과정 중 오류 발생',error);
      }

    }
    //파일 수정
    if(isModified2){

      const formDataImg = new FormData();
      let imgEndpoint = '/book/file/';
      let postNo = type=='review'? vo.review_NO : vo.recommend_NO;
      if (postType === 'recommend') {
        imgEndpoint += 'rcmImgUrlToFile';
        formDataImg.append('rcmNo', postNo);
      } else {
        imgEndpoint += 'rvImgUrlToFile';
        formDataImg.append('rvNo', postNo);
      }

      // 삭제된 이미지 처리
      const deletedFiles = fileList.filter(file => !fileLists.includes(file));
      for (const file of deletedFiles) {
        await axios.delete(`/book/file/postImgDelete`, {
          data: {
            fileNo: file.file_no,
            url: file.file_url
          }
        });
      }

      // 추가된 이미지 업로드 요청
      if (uploadFiles.length > 0) {
        uploadFiles.forEach((file) => {
          formDataImg.append('uploadFiles', file);
        });

        const responseImg = await axios.post(imgEndpoint, formDataImg);
        if (responseImg.data === 'success') {
          if (postType === 'recommend') setShowToast(true);
          else setShowToast2(true);
        } else {
          alert('이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
      }

    }
















  }
  

  

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

  const handleDeleteFile = (index,type,url,no) => {
    if(type==='origin'){
      const newFiles = [...fileLists];
      newFiles.splice(index, 1);
      setFileLists(newFiles);
    }else{
      const newFiles = [...uploadFiles];
      newFiles.splice(index, 1);
      setUploadFiles(newFiles);
    }
    
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
    if(bookTitle==''){
      alert('책 제목을 입력해주세요');
    }else{
      setModalStatus('on');
      setSearchModalIsOpen(true);
    }

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
            <h3 className="write-title">{type ? ('게시글 수정'):('게시글 작성')}</h3>
          </div>
          
          <form onSubmit={type?handleModify:handleSubmit} className="write-form">
            <table className="write-table">
              <tbody>
                <tr className="write-row">
                  <td>
                    <label className="write-label">게시글 유형</label>
                  </td>
                  <td>
                    <div className="radio-buttons">
                      <label className={`radio-button ${postType === 'recommend' ? 'selected' : ''}`}>
                        <input type="radio" value="recommend" checked={postType === 'recommend'} onChange={(e) => setPostType(e.target.value)}/>
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
                      <SearchBook isOpen={searchModalIsOpen} onRequestClose={() => { setSearchModalIsOpen(false); setModalStatus('off') ;}} bookTitle={bookTitle} setBook= {(e)=>setBookTitle(e)}status={modalStatus} bookSelect = {(e)=>setSelectBook(e)} bookCheck={()=>setBookTitleCheck(true)} />
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
                    <label  className="modalWrite-file modalWrite-label">이미지첨부</label>
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
              <label className="modalWrite-label" style={{marginRight:'110px'}}>첨부 파일</label>
              {fileLists && fileLists.map((file, index) => (
                <div key={index} style={{ position: "relative", marginRight: "15px" }}>
                {/* 삭제 아이콘 */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="gray" style={{ position: "absolute", top: "-2", right: "-4", zIndex: "1", cursor:"pointer"}} className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"
                  onClick={() => handleDeleteFile(index,'origin',file.file_url,file.file_no)}/>
                </svg>
                {/* 파일 미리보기 */}
                <img src={file.file_url} alt={`Preview ${index}`} style={{ width: "90px", height: "90px" }}/>
              </div>
              ))}
              {uploadFiles && uploadFiles.map((file, index) => (
                <div key={index} style={{ position: "relative", marginRight: "15px" }}>
                  {/* 삭제 아이콘 */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="gray" style={{ position: "absolute", top: "-2", right: "-4", zIndex: "1", cursor:"pointer"}} className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"
                    onClick={() => handleDeleteFile(index,'new')}/>
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
              cate = {type ? (type === 'review' ? reviewVO.review_CATEGORY : recommendVO.recommend_CATEGORY) : ''}
            />    
            <SelectKeyword 
              setSelectedKeywords={setSelectedKeywords} 
              msg={componentMsg} 
              kwd={type? (type==='review'? reviewVO.review_KEYWORD : recommendVO.recommend_KEYWORD) : ''}
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
