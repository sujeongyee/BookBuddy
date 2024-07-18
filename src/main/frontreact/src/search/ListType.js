import React, { useState, useEffect} from "react";
import '../main/main.css';
import { useLoading } from "../context/LoadingContext";
import { useNavigate, useLocation } from 'react-router-dom';
import Pagination from "react-js-pagination";
import queryString from 'query-string';

const ListType = ({ type, posts, currentPage,setCurrentPage,postCnt,queryParams,rvPage }) => {
  const [showRecommend, setShowRecommend] = useState(true);
  const [recommendPosts, setRecommendPosts] = useState([]);
  const [reviewPosts, setReviewPosts] = useState([]);
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const itemsPerPage = 5;
  const location = useLocation();

  useEffect(() => {
    if (type == 'review') {
      setShowRecommend(false);
      setReviewPosts(posts);
    } else {
      setShowRecommend(true);
      setRecommendPosts(posts);
    }
  }, [type, posts]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const clickPost = (postNo) => { 
    if(type=='review') {
      if(rvPage){
        const updateQueryParams2 = { review: true, page: rvPage===-1 ? 0 : rvPage };
        navigate({
          pathname: location.pathname,
          search: queryString.stringify(updateQueryParams2),
        });
        navigate(`/post/review/${postNo}`);
      }else{
        const updateQueryParams2 = { review: true, page:0};
        navigate({
          pathname: location.pathname,
          search: queryString.stringify(updateQueryParams2),
        });
        navigate(`/post/review/${postNo}`);
      }
      
    }
    else navigate(`/post/recommend/${postNo}`);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const clickUser = (userNo) =>{
    navigate(`/userFeed/${userNo}`);
  }

  return (
    <div className="post-zone">
      
      {showRecommend ? (
        <div>
          {recommendPosts && recommendPosts.length > 0 ? (
            <div>
              {recommendPosts.map((post, index) => {
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
                    <div >
                      <div className="post-details">
                        <div className="noLogin-header">
                          {post.profile_URL ? (
                            <img onClick={()=> clickUser(post.user_NO)} src={post.profile_URL} alt="프로필 이미지" className="notLogin-profile-image" />
                          ) : (
                            <img onClick={()=> clickUser(post.user_NO)} src={process.env.PUBLIC_URL + '/imgs/no-profile.jpg'} alt="프로필 이미지" className="notLogin-profile-image" />
                          )}
                          <p className="post-user">{post.user_NICK}</p>
                        </div>
                        <div onClick={() => clickPost(post.recommend_NO)}>
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
                  </div>
                );
              })}
              {postCnt && (
                <div className="searchPaging">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={5}
                    totalItemsCount={postCnt}
                    pageRangeDisplayed={10}
                    prevPageText={"prev"}
                    nextPageText={"next"}
                    onChange={handlePageChange}
                  />
                </div>
              )}
              
            </div>
          ) : (
            <div style={{textAlign:'center'}}>조건에 해당되는 추천글이 없습니다.</div>
          )}
          
        </div>
      ) : (
        <div>
          {reviewPosts && reviewPosts.length > 0 ? (
            <div>
              {reviewPosts.map((post, index) => {
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
                    <div >
                      <div className="post-details">
                        <div className="noLogin-header">
                          {post.profile_URL ? (
                            <img onClick={()=> clickUser(post.user_NO)} src={post.profile_URL} alt="프로필 이미지" className="notLogin-profile-image" />
                          ) : (
                            <img  onClick={()=> clickUser(post.user_NO)}src={process.env.PUBLIC_URL + '/imgs/no-profile.jpg'} alt="프로필 이미지" className="notLogin-profile-image" />
                          )}
                          <p className="post-user">{post.user_NICK}</p>
                        </div>
                        <div onClick={() => clickPost(post.review_NO)}>
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
                  </div>
                );
              })}
              {postCnt && (
                <div className="searchPaging">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={5}
                    totalItemsCount={postCnt}
                    pageRangeDisplayed={10}
                    prevPageText={"prev"}
                    nextPageText={"next"}
                    onChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          ) : (
            <div style={{textAlign:'center'}}>조건에 해당되는 리뷰글이 없습니다.</div>
          )}
        </div>
      )}
    </div>
  )
}

export default ListType;
