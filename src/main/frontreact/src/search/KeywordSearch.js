import { useParams } from 'react-router-dom';
import Sidebar from '../main/Sidebar';
import Header from '../main/Header';
import axios from "axios";
import React, { useState, useEffect } from "react";
import ToastMsg from '../main/ToastMsg';
import { useNavigate } from 'react-router-dom';
import './search.css';

const KeywordSearch = () => {
  const { kwdNo } = useParams();
  const navigate = useNavigate();
  const [kwdList, setKwdList] = useState([]);
  const [selectedKwd, setSelectedKwd] = useState(new Set());
  const [rcmPosts, setRcmPosts] = useState([]);
  const [rvosts, setRvPosts] = useState([]);
  const [showReviews,setShowReviews] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/book/getAllKeywords');
        setKwdList(response.data);

        if (kwdNo === "all") {
          const allKeywords = response.data.map(kwd => kwd.keyword_NO);
          setSelectedKwd(new Set(allKeywords));
        } else {
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
          const response = await axios.post('/book/search/getByKeywords', { keywords: Array.from(selectedKwd) });
          setRcmPosts(response.data.recommend);
          setRvPosts(response.data.review);
          console.log(response.data);
        } else {
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [selectedKwd]);

  const handleKeywordClick = (keyword) => {
    const updatedSelectedKwd = new Set(selectedKwd);
    if (updatedSelectedKwd.has(keyword.keyword_NO)) {
      updatedSelectedKwd.delete(keyword.keyword_NO);
    } else {
      updatedSelectedKwd.add(keyword.keyword_NO);
    }
    setSelectedKwd(updatedSelectedKwd);
  };

  return (
    <div className="mainContainer">
      <div className="side">
        <Sidebar onCate={'kwd'} onCateList={kwdNo} />
      </div>
      <div className="mainContent2">
        <Header />
        <div className="mainSection3">
          <div className="kwdSearchTabContainer">
              <div className="kwdSearchTabs">
                <button className={`kwdSearchTab ${!showReviews ? "active" : ""}`} onClick={() => setShowReviews(false)}>
                  추천글 보기
                </button>
                <button className={`kwdSearchTab ${showReviews ? "active" : ""}`} onClick={() => setShowReviews(true)} >
                  리뷰글 보기                
                </button>
              </div>
          </div>
          <div className='keywordList'>
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
            {showReviews?(<div></div>):(<div></div>)}
          </div>
        </div>
      </div>
    </div>
  )
};

export default KeywordSearch;
