import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useLoading } from "../context/LoadingContext";
import './modifypostform.css';

const ModifyPostForm = () => {
  const { type, postNo } = useParams();
  const { userData } = useUser();
  const { userNo } = userData;
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [bookTitle, setBookTitle] = useState("");

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        showLoading();
        const response = await axios.get(`/book/post/postDetail?type=${type}&postNo=${postNo}`);
        const postData = response.data.recommendVO || response.data.reviewVO;
        setPost(postData);
        setTitle(postData.recommend_TITLE || postData.review_TITLE);
        setContent(postData.recommend_CONTENT || postData.review_CONTENT);
        setBookTitle(postData.recommend_BOOKTITLE || postData.review_BOOKTITLE);
        hideLoading();
      } catch (error) {
        hideLoading();
        console.error("Error fetching post details", error);
      }
    };

    fetchPostDetail();
  }, [type, postNo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      showLoading();
      await axios.post(`/book/post/modifyPost`, { postNo, userNo, type, title, content, bookTitle });
      hideLoading();
      navigate(`/postDetail/${type}/${postNo}`);
    } catch (error) {
      hideLoading();
      console.error("Error modifying post", error);
    }
  };

  return (
    <div className="modifyPostContainer">
      {post && (
        <form onSubmit={handleSubmit} className="modifyPostForm">
          <h2>Modify Post</h2>
          <div className="formGroup">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="bookTitle">Book Title</label>
            <input
              id="bookTitle"
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default ModifyPostForm;
