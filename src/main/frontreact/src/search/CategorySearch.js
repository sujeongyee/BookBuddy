import { useParams, useLocation } from 'react-router-dom';
import Sidebar from '../main/Sidebar';
import Header from '../main/Header';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useLoading } from "../context/LoadingContext";
import ToastMsg from '../main/ToastMsg';
import { useNavigate } from 'react-router-dom';
import ListType from './ListType';
import queryString from 'query-string';

const CategorySearch = () => {

  const {cateNo} = useParams();
  const location = useLocation();
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
  const queryParams = queryString.parse(location.search);
  const { cate, viewAll, sort, showReview, page, click ,move} = queryParams;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/book/getAllCategories');
        setCateList(response.data);
        if(cate && !click){
          if (cate) {
            setSelectedCate(new Set(cate.split(',')));
          }
          if (viewAll) {
            setAllChecked(viewAll === 'true');
          }
          if (sort) {
            setSortBy(sort);
          }
          if (showReview) {
            setShowReviews(showReview === 'true');
          }
          if (page) {
            setCurrentPage(parseInt(page, 10));
          }
          
        }else if (cateNo === "all") {
          setCurrentPage(1);
          const allCategories= response.data.map(cate => cate.category_NO);
          setSelectedCate(new Set(allCategories));
        } else {
          const updateQueryParams2 = {
            cate: cateNo,
            viewAll: allChecked,
            sort: sortBy,
            showReview: showReviews,
            page: currentPage,
          };
          navigate({
            pathname: location.pathname,
            search: queryString.stringify(updateQueryParams2),
          });
          setCurrentPage(1);
          setSelectedCate(new Set([cateNo]));
        }
      } catch (error) {
        console.error('Error fetching keywords:', error);
      }
    };
    if(!click) fetchData();
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

    if(!click) fetchPosts();
  }, [selectedCate, allChecked,sortBy,currentPage]);

  // 쿼리스트링 업데이트 함수
  const updateQueryString = () => {
    
    if(!click){
      const updateQueryParams3 = {
        cate: Array.from(selectedCate).join(','),
        viewAll: allChecked.toString(),
        sort: sortBy,
        showReview: showReviews.toString(),
        page: currentPage.toString(),
      };
  
      navigate({
        pathname: location.pathname,
        search: queryString.stringify(updateQueryParams3),
      });
    }
    
  };

  useEffect(() => {
    if(!click) updateQueryString();
  }, [selectedCate, allChecked, sortBy, showReviews, currentPage]);

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
    if(!click)fetchCnt();
  }, [selectedCate, allChecked,sortBy]);

  const handleCheckClick = () => {
    setCurrentPage(1);
    setAllChecked(prevChecked => !prevChecked);
  };

  const handleCategoryClick = (category) => {
    setCurrentPage(1);
    const updatedSelectedCate = new Set(selectedCate);
    if (updatedSelectedCate.has(category.category_NO)) {
      updatedSelectedCate.delete(category.category_NO);
    } else {
      updatedSelectedCate.add(category.category_NO);
    }
    setSelectedCate(updatedSelectedCate);
  };

  const handleSortChange = (e) => {
    setCurrentPage(1);
    setSortBy(e.target.value);
  };

  const handleTypeChange = (e) => {
    setShowReviews(e);
    setCurrentPage(1);
  }


  return (
    <div className="mainContainer">
      <div className="side">
        <Sidebar onCate={'cate'} onCateList={cateNo} selectedCate={selectedCate}/>
      </div>
      <div className="mainContent2">
        <Header />        
        {!loading ? (
          <div className="mainSection3">
        
            <div className="kwdSearchTabContainer">
              <div className="kwdSearchTabs">
                <button className={`kwdSearchTab ${!showReviews ? "active" : ""}`} onClick={() => handleTypeChange(false)}>
                  추천글 보기
                </button>
                <button className={`kwdSearchTab ${showReviews ? "active" : ""}`} onClick={() => handleTypeChange(true)}>
                  리뷰글 보기
                </button>
              </div>
            </div>
            
            <div className='keywordList'>
              <span className='containsCheck'><input type='checkbox' checked={allChecked} onChange={handleCheckClick} />해당 카테고리가 모두 포함된 결과만 보기</span>
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