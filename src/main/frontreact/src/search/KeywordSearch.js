import { useParams, useLocation, useHistory  } from 'react-router-dom';
import Sidebar from '../main/Sidebar';
import Header from '../main/Header';
import axios from "axios";
import React, { useState, useEffect } from "react";
import ToastMsg from '../main/ToastMsg';
import { useNavigate } from 'react-router-dom';
import './search.css';
import NotLoginPosts from '../postcomponent/NotLoginPosts';
import { useLoading } from "../context/LoadingContext";
import ListType from './ListType';
import queryString from 'query-string';

const KeywordSearch = () => {
  const { kwdNo } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [kwdList, setKwdList] = useState([]);
  const [selectedKwd, setSelectedKwd] = useState(new Set());
  const [rcmPosts, setRcmPosts] = useState([]);
  const [rvPosts, setRvPosts] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const [loading, setLoading] = useState(true);
  const [allChecked, setAllChecked] = useState(true);
  const [sortBy, setSortBy] = useState('R.RECOMMEND_TIME DESC');
  const [currentPage, setCurrentPage] = useState(1);
  const [postCnt,setPostCnt] = useState(0);
  const queryParams = queryString.parse(location.search);
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/book/getAllKeywords');
        setKwdList(response.data);        
        const { selectedKwd, allChecked, sortBy, showReviews, currentPage } = queryParams;
        if(selectedKwd){
          if (selectedKwd) {
            setSelectedKwd(new Set(selectedKwd.split(',')));
          }
          if (allChecked) {
            setAllChecked(allChecked === 'true');
          }
          if (sortBy) {
            setSortBy(sortBy);
          }
          if (showReviews) {
            setShowReviews(showReviews === 'true');
          }
          if (currentPage) {
            setCurrentPage(parseInt(currentPage, 10));
          }
        }else if (kwdNo === "all") {
          setCurrentPage(1);
          const allKeywords = response.data.map(kwd => kwd.keyword_NO);
          setSelectedKwd(new Set(allKeywords));
        } else {
          setCurrentPage(1);
          setSelectedKwd(new Set([kwdNo]));
        }      
        
      } catch (error) {
        console.error('Error fetching keywords:', error);
      }
    };
    
    fetchData();
  }, [kwdNo]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (selectedKwd.size > 0) {
          showLoading();
          const response = await axios.post('/book/search/getByKeywords', { keywords: Array.from(selectedKwd), allChecked, sortBy, currentPage });
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
    
  }, [selectedKwd, allChecked,sortBy,currentPage]);

  useEffect(() => {
    const fetchCnt = async () => {
      try {
        if (selectedKwd.size > 0) {
          setLoading(true);
          const type= showReviews ? 'review':'recommend';
          const response = await axios.post('/book/search/getByKeywordsCnt', { keywords: Array.from(selectedKwd), allChecked, type });
          setPostCnt(response.data);
          setLoading(false);
        } else {
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchCnt();
  }, [selectedKwd, allChecked,sortBy]);


  const handleCheckClick = () => {
    setCurrentPage(1);
    setAllChecked(prevChecked => !prevChecked);
  };

  const handleKeywordClick = (keyword) => {
    setCurrentPage(1);
    const updatedSelectedKwd = new Set(selectedKwd);
    if (updatedSelectedKwd.has(keyword.keyword_NO)) {
      updatedSelectedKwd.delete(keyword.keyword_NO);
    } else {
      updatedSelectedKwd.add(keyword.keyword_NO);
    }
    setSelectedKwd(updatedSelectedKwd);
  };

  const handleSortChange = (e) => {
    setCurrentPage(1);
    setSortBy(e.target.value);
  };

  const handleTypeChange = (e) => {
    setShowReviews(e);
    setCurrentPage(1);
  }


  
  // 쿼리스트링 업데이트 함수
  const updateQueryString = () => {
    const { selectedKwd, allChecked, sortBy, showReviews, currentPage } = queryParams;
    if(selectedKwd){
      console.log('???????????');
      const queryParams = {
        selectedKwd: Array.from(selectedKwd).join(','),
        allChecked: allChecked.toString(),
        sortBy: sortBy,
        showReviews: showReviews.toString(),
        currentPage: currentPage.toString(),
      };
  
      // navigate 함수로 쿼리스트링 업데이트
      navigate({
        pathname: location.pathname,
        search: queryString.stringify(queryParams),
      });
    }
    
  };

  // 페이지 로드 후 한 번 쿼리스트링 업데이트
  useEffect(() => {
    updateQueryString();
  }, [selectedKwd, allChecked, sortBy, showReviews, currentPage]);
  

  return (
    <div className="mainContainer">
      <div className="side">
        <Sidebar onCate={'kwd'} onCateList={kwdNo} selectedKwd={selectedKwd}/>
      </div>
      <div className="mainContent2">
        <Header />
        
          <div className="mainSection3" style={{width:'90%'}}>
        
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
              <span className='containsCheck'><input type='checkbox' checked={allChecked} onChange={handleCheckClick} />해당 키워드가 모두 포함된 결과만 보기</span>
              {kwdList && kwdList.map((kwd) => (
                <span
                  key={kwd.keyword_NO}
                  className={`keyword ${selectedKwd.has(kwd.keyword_NO) ? 'selected' : ''}`}
                  onClick={() => handleKeywordClick(kwd)}
                >
                  {kwd.keyword_NAME}
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
                    <ListType type='recommend' posts={rcmPosts} currentPage={currentPage} setCurrentPage={(e)=>setCurrentPage(e)} postCnt={postCnt} />
                  </div>
                )
              ) : null}
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default KeywordSearch
