import React, { useState, useEffect } from "react";
import axios from "axios";
import '../main/main.css';
import Loading from "../main/Loading";
import { useLoading } from "../context/LoadingContext";
import { useNavigate } from 'react-router-dom';

function NotLoginPosts() {
  const [showRecommend, setShowRecommend] = useState(true);
  const [reviewPosts, setReviewPosts] = useState([]);
  const [recommendPosts, setRecommendPosts] = useState([]);
  const [reviewPage, setReviewPage] = useState(0);
  const [recommendPage, setRecommendPage] = useState(0);
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoading();
        const response = await axios.get(
          `/book/post/getNotLogin?reviewPage=${reviewPage}&recommendPage=${recommendPage}`
        );
        if (showRecommend && reviewPosts.length === 0 && recommendPosts.length === 0 && reviewPage === 0) {
          setRecommendPosts(prevPosts => [...prevPosts, ...response.data.recommendList]);
          setReviewPosts(prevPosts => [...prevPosts, ...response.data.reviewList]);
        } else if (showRecommend) {
          setRecommendPosts(prevPosts => [...prevPosts, ...response.data.recommendList]);
        } else if (!showRecommend) {
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const clickPost = () => {
    alert('게시물은 로그인 하셔야 볼 수 있습니다.');
    navigate('/login');
  }

  return (
    <div className="main-content">
      <div>
        <div className="main-toggle">
          <button className={`toggle-btn first-toggle ${showRecommend ? 'toggle-active' : ''}`} onClick={() => setShowRecommend(true)}>추천글 보기</button>
          <button className={`toggle-btn ${!showRecommend ? 'toggle-active' : ''}`} onClick={() => setShowRecommend(false)}>리뷰글 보기</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div></div>
          <p style={{ fontSize: '13px', color: 'red' }}>* 비로그인 상태에서는 인기글 10개를 표시합니다.</p>
        </div>
        <div className="post-zone">
          {showRecommend ? (
            <div>
              {recommendPosts.length > 0 ? (
                <div>
                  {recommendPosts.map((post, index) => {
                    // Thumbnail image URL 선택 로직
                    let thumbnailUrl;
                    if (post.fileUrl) {
                      thumbnailUrl = post.fileUrl;
                    } else if (post.book_THUMBNAIL) {
                      thumbnailUrl = post.book_THUMBNAIL;
                    } else {
                      thumbnailUrl = process.env.PUBLIC_URL + '/imgs/img-notExist.png';
                    }

                    return (
                      <div key={`recommend-${post['recommend_NO']}-${index}`} className="post-card">
                        <div onClick={() => clickPost()}>
                          <div className="post-details">
                            <div className="noLogin-header">
                              {post.profile_URL ? (
                                <img src={post.profile_URL} alt="프로필 이미지" className="notLogin-profile-image" />
                              ) : (
                                <img src={process.env.PUBLIC_URL + '/imgs/no-profile.jpg'} alt="프로필 이미지" className="notLogin-profile-image" />
                              )}
                              <p className="post-user">{post.user_NICK}</p>
                            </div>
                            <div className="noLogin-imgZone">
                              <img src={thumbnailUrl} alt="썸네일" className="notLogin-post-thumbnail" />
                            </div>
                            <div className="notLogin-postDetail">
                              <h3 className="notLogin-post-title2">{post.recommend_TITLE}</h3>
                              <p className="post-content">{post.recommend_CONTENT}</p>
                              <p className="post-time">{formatDate(post['recommend_TIME'])}</p>
                              <span>
                                {post.recommend_CATEGORY2.split(',').map((category, index) => (
                                  <span key={index} className="PostcategoryTag">{category.trim()}</span>
                                ))}
                                {post.recommend_KEYWORD2.split(',').map((keyword, index) => (
                                  <span key={index} className="PostKeywordTag">{keyword.trim()}</span>
                                ))}
                              </span>
                              <div className="iconZone">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff9797" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                </svg>
                                <span className="post-list-likes">{post.likeCnt}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff9797" className="bi bi-chat-fill" viewBox="0 0 16 16">
                                  <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
                                </svg>
                                <span className="post-list-comments"><i className="fas fa-comment"></i> {post.cmtCnt}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>추천글이 없습니다.</div>
              )}
            </div>
          ) : (
            <div>
              {reviewPosts.length > 0 ? (
                <div>
                  {reviewPosts.map((post, index) => {
                    // Thumbnail image URL 선택 로직
                    let thumbnailUrl;
                    if (post.fileUrl) {
                      thumbnailUrl = post.fileUrl;
                    } else if (post.book_THUMBNAIL) {
                      thumbnailUrl = post.book_THUMBNAIL;
                    } else {
                      thumbnailUrl = process.env.PUBLIC_URL + '/imgs/img-notExist.png';
                    }

                    return (
                      <div key={`review-${post['review_NO']}-${index}`} className="post-card">
                        <div onClick={() => clickPost()}>
                          <div className="post-details">
                            <div className="noLogin-header">
                              {post.profile_URL ? (
                                <img src={post.profile_URL} alt="프로필 이미지" className="notLogin-profile-image" />
                              ) : (
                                <img src={process.env.PUBLIC_URL + '/imgs/no-profile.jpg'} alt="프로필 이미지" className="notLogin-profile-image" />
                              )}
                              <p className="post-user">{post.user_NICK}</p>
                            </div>
                            <div className="noLogin-imgZone">
                              <img src={thumbnailUrl} alt="썸네일" className="notLogin-post-thumbnail" />
                            </div>
                            <div className="notLogin-postDetail">
                              <h3 className="notLogin-post-title">{post.review_TITLE}</h3>
                              <p className="post-content">{post.review_CONTENT}</p>
                              <p className="post-time">{formatDate(post['review_TIME'])}</p>
                              <span>
                                {post.review_CATEGORY2.split(',').map((category, index) => (
                                  <span key={index} className="PostcategoryTag">{category.trim()}</span>
                                ))}
                                {post.review_KEYWORD2.split(',').map((keyword, index) => (
                                  <span key={index} className="PostKeywordTag">{keyword.trim()}</span>
                                ))}
                              </span>
                              <div className="iconZone">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff9797" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                </svg>
                                <span className="post-list-likes">{post.likeCnt}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff9797" className="bi bi-chat-fill" viewBox="0 0 16 16">
                                  <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
                                </svg>
                                <span className="post-list-comments"><i className="fas fa-comment"></i> {post.cmtCnt}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
