import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axios from "axios";
import './mybook.css';
import { useUser } from "../context/UserContext";

const WritePost = ({ isOpen, onRequestClose}) => {
  const { userData } = useUser();
  const { userId } = userData;
  const navigate = useNavigate();

  const [postTitle, setPostTitle] = useState("");
  const [postType, setPostType] = useState("");
  const [bookTitle,setBookTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [rating, setRating] = useState(0);
  const [bookImages, setBookImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");


  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      position: "relative",
      top: "auto",
      left: "auto",
      right: "auto",
      bottom: "auto",
      maxWidth: "666px",
      width: "663px",
      maxHeight:"626px",
      padding: "0px",
      border: "none",
      borderRadius: "12px",
      backgroundColor: "#f3f7ff",
      boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
      height: "auto",
    },
  };
  const handleSearchImages = async () => {
    try {
      const search = '책 '+bookTitle;
      const API_KEY = process.env.REACT_APP_API_KEY;
      const CX = process.env.REACT_APP_ENGINE_ID;
      const encodedBookTitle = encodeURIComponent(search);
      const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodedBookTitle}&searchType=image`;

      const response = await axios.get(searchUrl);
      const items = response.data.items || [];
      if(items.length>=4){
        setBookImages(items.slice(0, 4).map(item => item.link));
      }else{
        setBookImages(items.map(item => item.link));
      }
      
    } catch (error) {
      console.error('Error searching for book images:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 게시글 작성 처리 코드

    // 작성 후 페이지 이동
    navigate('/myBook');
  };

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const [uploadFiles, setUploadFiles] = useState([]);
  
  const handleImageUpload = (files) => {
    // 파일 업로드 및 정보 저장
    if (uploadFiles.length>=4) {
      alert("최대 4개의 이미지만 선택할 수 있습니다.");
      return;
    }
    const uploadedFiles = Array.from(files);
    setUploadFiles([...uploadFiles, ...uploadedFiles]);
  };

  const handleDeleteFile = (index) => {
    // 배열에서 해당 인덱스의 이미지를 제거
    const newFiles = [...uploadFiles];
    newFiles.splice(index, 1);
    setUploadFiles(newFiles);
  };

  return(
    
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customModalStyles} contentLabel="게시글 작성">
    <div className="modalWrite-container">
      <div className="modalWrite-header">
        <h3 className="modalWrite-title">게시글 작성</h3>
        <button className="modalWrite-closeButton" onClick={onRequestClose}>X</button>
      </div>
    
      <form onSubmit={handleSubmit} className="modalWrite-form">
        <table className="modalWrite-table">
          <tbody>
            <tr className="modalWrite-row">
              <td>
                <label className="modalWrite-label">게시글 유형</label>
              </td>
              <td>
                <div className="radio-buttons">
                  {/* 라디오 버튼 스타일 적용 */}
                  <label className={`radio-button ${postType === 'recommendation' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      value="recommendation"
                      checked={postType === 'recommendation'}
                      onChange={(e) => setPostType(e.target.value)}
                    />
                    추천
                  </label>
                  <label className={`radio-button ${postType === 'review' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      value="review"
                      checked={postType === 'review'}
                      onChange={(e) => setPostType(e.target.value)}
                    />
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
                <div className="modalWrite-searchContainer">
                  <input
                    type="text"
                    id="postBookTitle"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    className="modalWrite-input modalWrite-inputTitle"
                    placeholder="책 제목을 입력하세요."
                  />
                  
                </div>
              </td>
            </tr>
           
            <tr className="modalWrite-row">
              <td>
                <label htmlFor="postContent" className="modalWrite-label">내용</label>
              </td>
              <td>
                <textarea
                  id="postContent"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="modalWrite-input modalWrite-textarea"
                  placeholder="게시글 내용을 입력하세요."
                />
              </td>
            </tr>
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
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill={starValue <= rating ? "currentColor" : "none"}
                          stroke="currentColor"
                          className="bi bi-star star-rating"
                          viewBox="0 0 22 23"
                          onClick={() => handleRating(starValue)}
                          style={{ cursor: 'pointer' }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.515.284a1 1 0 0 1 1.97 0l1.21 4.65a.5.5 0 0 0 .494.35h4.582a1 1 0 0 1 .773 1.654l-3.5 2.548a.5.5 0 0 0-.154.494l1.21 4.65a1 1 0 0 1-1.516 1.053L8 12.697l-3.395 2.287a1 1 0 0 1-1.516-1.054l1.21-4.65a.5.5 0 0 0-.154-.494l-3.5-2.548a1 1 0 0 1 .773-1.654h4.582a.5.5 0 0 0 .494-.35L7.515.284z"
                          />
                        </svg>
                      );
                    })}
                  </div>
                </td>
                {/* <td>
                  <input
                    type="number"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="modalWrite-input modalWrite-ratingInput"
                    min="1"
                    max="5"
                  />
                </td> */}
              </tr>
            )}
            <tr className="modalWrite-row">
              <td>
                <label  className="modalWrite-file">이미지첨부</label>
              </td>
              <td>
                <label for="img-btn" class="label-img">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16">
                    <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"/>
                  </svg>
                </label>
                <input type="file" id="img-btn" style={{ display: "none" }} multiple onChange={(e) => handleImageUpload(e.target.files)} accept="image/*"
                />
                
                {/* 업로드된 파일들의 이름과 미리보기 */}
                <div style={{ display: "flex" ,width:"90%",}}>
                  {uploadFiles.map((file, index) => (
                    <div key={index} style={{ position: "relative", marginRight: "15px" }}>
                      {/* 삭제 아이콘 */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" style={{ position: "absolute", top: "-2", right: "-4", zIndex: "1", cursor:"pointer"}} className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"
                        onClick={() => handleDeleteFile(index)}/>
                      </svg>
                      
                      {/* 파일 미리보기 */}
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        style={{ width: "90px", height: "90px" }}
                      />
                    </div>
                  ))}
                </div>
              </td>

            </tr>
            <tr>
            <button type="button" onClick={handleSearchImages} multiple style={{display:'none'}} className="modalWrite-searchButton">이미지 검색</button>
            </tr>
            <tr className="modalWrite-row">
              <td colSpan="2">
                {/* 이미지 검색 결과 및 선택된 이미지 */}
                <div>
                  {/* 이미지 표시 및 스타일링 */}
                  {bookImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Book ${index + 1}`}
                      onClick={() => setSelectedImage(image)}
                      className="modalWrite-bookImage"
                    />
                  ))}
                </div>
              </td>
            </tr>
            <tr className="modalWrite-row">
              <td colSpan="2">
                {/* 선택된 이미지 표시 */}
                {selectedImage && (
                  <img src={selectedImage} alt="Selected Book" className="modalWrite-selectedImage" />
                )}
              </td>
            </tr>
            
          </tbody>
          {/* 게시 버튼 */}
          
        </table>
        <button type="submit" className="modalWrite-submitButton">작성하기</button>
      </form>
    </div>
  </Modal>
  )
}

export default WritePost;
