import { useParams, useHistory } from 'react-router-dom';
import Sidebar from '../main/Sidebar';
import Header from '../main/Header';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useLoading } from "../context/LoadingContext";
import ToastMsg from '../main/ToastMsg';
import { useNavigate } from 'react-router-dom';
import ListType from './ListType';

const CategorySearch = () => {

  const {cateNo} = useParams();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const [cateList, setCateList] = useState([]);
  const [selectedCate, setSelectedCate] = useState(new Set());
  const [rcmPosts, setRcmPosts] = useState([]);
  const [rvPosts, setRvPosts] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allChecked, setAllChecked] = useState(true);
  const [sortBy, setSortBy] = useState('R.RECOMMEND_TIME DESC');
  const [currentPage, setCurrentPage] = useState(1);
  const [postCnt,setPostCnt] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/book/getAllCategories');
        setCateList(response.data);

        if (cateNo === "all") {
          const allCategories= response.data.map(cate => cate.category_NO);
          setSelectedCate(new Set(allCategories));
        } else {
          setSelectedCate(new Set([cateNo]));
        }
      } catch (error) {
        console.error('Error fetching keywords:', error);
      }
    };
    setCurrentPage(1);
    fetchData();
  }, [cateNo]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (selectedCate.size > 0) {
          showLoading();
          const response = await axios.post('/book/search/getByCategories', { categories: Array.from(selectedCate), allChecked, sortBy, currentPage });
          setRcmPosts(response.data.recommend);
          setRvPosts(response.data.review);
          setLoading(false);
          hideLoading();
        } else {
          setRcmPosts([]);
          setRvPosts([]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [selectedCate, allChecked,sortBy,currentPage]);

  useEffect(() => {
    const fetchCnt = async () => {
      try {
        if (selectedCate.size > 0) {
          setLoading(true);
          const type= showReviews ? 'review':'recommend';
          const response = await axios.post('/book/search/getByCategoriesCnt', { categories: Array.from(selectedCate), allChecked, type });
          setPostCnt(response.data);
          setLoading(false);
        } else {
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    setCurrentPage(1);
    fetchCnt();
  }, [selectedCate, allChecked,sortBy]);

  const handleCheckClick = () => {
    setAllChecked(prevChecked => !prevChecked);
  };

  const handleCategoryClick = (category) => {
    const updatedSelectedCate = new Set(selectedCate);
    if (updatedSelectedCate.has(category.category_NO)) {
      updatedSelectedCate.delete(category.category_NO);
    } else {
      updatedSelectedCate.add(category.category_NO);
    }
    setSelectedCate(updatedSelectedCate);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };


  return (
    <div className="mainContainer">
      <div className="side">
        <Sidebar onCate={'cate'} onCateList={cateNo} />
      </div>
      <div className="mainContent2">
        <Header />        
        {!loading ? (
          <div className="mainSection3">
        
            <div className="kwdSearchTabContainer">
              <div className="kwdSearchTabs">
                <button className={`kwdSearchTab ${!showReviews ? "active" : ""}`} onClick={() => setShowReviews(false)}>
                  추천글 보기
                </button>
                <button className={`kwdSearchTab ${showReviews ? "active" : ""}`} onClick={() => setShowReviews(true)}>
                  리뷰글 보기
                </button>
              </div>
            </div>
            
            <div className='keywordList'>
              <span className='containsCheck'><input type='checkbox' checked={allChecked} onChange={handleCheckClick} />해당 키워드가 모두 포함된 결과만 보기</span>
              {cateList && cateList.map((cate) => (
                <span
                  key={cate.category_NO}
                  className={`keyword ${selectedCate.has(cate.category_NO) ? 'selected' : ''}`}
                  onClick={() => handleCategoryClick(cate)}
                >
                  {cate.category_NAME}
                </span>
              ))}
            </div>
            <div className='kwdSearchPostList'>
              <div className='kwdSearchSelectZone'>
              <select className="kwdSearchOrder" id="kwdSearchOrder" value={sortBy} onChange={handleSortChange}>
                <option value={`R.${showReviews ? 'REVIEW' : 'RECOMMEND'}_TIME DESC`}>등록최근순</option>
                <option value={`R.${showReviews ? 'REVIEW' : 'RECOMMEND'}_TIME ASC`}>등록오래된순</option>
                <option value='likeCnt DESC'>좋아요순</option>
                <option value="cmtCnt DESC">댓글순</option>
                {showReviews && (<option value="R.REVIEW_RATING DESC">별점높은순</option>)}
                {showReviews && (<option value="R.REVIEW_RATING ASC">별점낮은순</option>)}
              </select>
              </div>
              {!loading ? (
                showReviews ? (
                  <div>
                    <ListType type='review' posts={rvPosts} currentPage={currentPage} setCurrentPage={(e)=>setCurrentPage(e)} postCnt={postCnt}/>
                  </div>
                ) : (
                  <div>
                    <ListType type='recommend' posts={rcmPosts} currentPage={currentPage} setCurrentPage={(e)=>setCurrentPage(e)} postCnt={postCnt}/>
                  </div>
                )
              ) : null}
            </div>
          </div>): null}
      </div>  
    </div>
  )

}
export default CategorySearch