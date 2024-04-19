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
      maxWidth: "600px",
      width: "650px",
      maxHeight:"600px",
      padding: "0px",
      border: "none",
      borderRadius: "12px",
      backgroundColor: "#ffffff",
      boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
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
      if(items.length>=5){
        setBookImages(items.slice(0, 5).map(item => item.link));
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


  return(
    
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customModalStyles} contentLabel="게시글 작성">
    <div className="modalWrite-container">
      <div className="modalWrite-header">
        <h3 className="modalWrite-title">게시글 작성</h3>
        <button className="modalWrite-closeButton" onClick={onRequestClose}>닫기</button>
      </div>
    
      <form onSubmit={handleSubmit} className="modalWrite-form">
        <div className="modalWrite-row">
          <label className="modalWrite-label">게시글 유형</label>
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
        </div>
        
        {/* 책 제목 입력 및 이미지 검색 부분 */}
        <div className="modalWrite-row">
          <label htmlFor="postBookTitle" className="modalWrite-label">책 제목</label>
          <div className="modalWrite-searchContainer">
            <input
              type="text"
              id="postBookTitle"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              className="modalWrite-input modalWrite-inputTitle"
              placeholder="책 제목을 입력하세요."
            />
            <button type="button" onClick={handleSearchImages} className="modalWrite-searchButton">이미지 검색</button>
          </div>
        </div>
        
        {/* 이미지 검색 결과 및 선택된 이미지 */}
        <div className="modalWrite-row">
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
        
        {/* 선택된 이미지 표시 */}
        <div className="modalWrite-row">
          {selectedImage && (
            <img src={selectedImage} alt="Selected Book" className="modalWrite-selectedImage" />
          )}
        </div>
        
        {/* 게시글 내용 입력 부분 */}
        <div className="modalWrite-row">
          <label htmlFor="postContent" className="modalWrite-label">내용</label>
          <textarea
            id="postContent"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="modalWrite-input modalWrite-textarea"
            placeholder="게시글 내용을 입력하세요."
          />
        </div>
        
        {/* 리뷰일 경우 별점 입력 */}
        {postType === 'review' && (
          <div className="modalWrite-row">
            <label htmlFor="rating" className="modalWrite-label">별점</label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="modalWrite-input modalWrite-ratingInput"
              min="1"
              max="5"
            />
          </div>
        )}
        
        {/* 게시 버튼 */}
        <div className="modalWrite-row">
          <button type="submit" className="modalWrite-submitButton">작성하기</button>
        </div>
      </form>
    </div>
  </Modal>
  )
}

export default WritePost;
