import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from '../context/UserContext';
import ListType from "../search/ListType";
import { useLoading } from "../context/LoadingContext";
const LoginPosts = () => {
  const {userData} = useUser();
  const {userId, userNo} = userData;

  const [showReviews, setShowReviews] = useState(false);
  const [rcmPosts, setRcmPosts] = useState([]);
  const [rvPosts, setRvPosts] = useState([]);
  const [rcmPage, setRcmPage] = useState(1);
  const [rvPage, setRvPage] = useState(0);
  const [rcmPostEnd,setRcmPostEnd] = useState(false);
  const [rvPostEnd,setRvPostEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userNo !== '' && userNo) {
          showLoading();
          setLoading(true);
          let type = showReviews ? 'review':'recommend';
          let page = showReviews ? rvPage : rcmPage;
          const response = await axios.get(`/book/post/getLoginFeed?userNo=${userNo}&page=${page}&type=${type}`);
          if(type==='review'){
            if(response.data.reviewList.length==0) {
              setRvPostEnd(true);
              return;
            }
            setRvPosts(prevPosts => [...prevPosts, ...response.data.reviewList]);
          }else{
            if(response.data.recommendList.length==0) {
              setRcmPostEnd(true);
              return;
            }
            setRcmPosts(prevPosts => [...prevPosts, ...response.data.recommendList]);
          }        
          setLoading(false);
          hideLoading();
        }
      } catch (error) {
        console.error('데이터 가져오기 에러:', error);
        setLoading(false);
      }
    };

    fetchData();

  }, [userId, userNo, rcmPage,rvPage]);

 

  const handleTypeChange = (e) => {
    if(e && rvPage==0) setRcmPage(prevPage => prevPage + 1);
    setShowReviews(e);
  };

  const handleScroll = () => {
    if(!rvPosts && !rcmPosts) return; 
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 10 && !loading) {
      if(showReviews) setRvPage(prevPage => prevPage + 1);
      else setRcmPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  return (
    <div className="mainSection3" style={{ width: '90%' }}>
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
      <div>
        <span className='containsCheck'>팔로우 중인 버디의 게시물을 최신순으로 보여드려요!</span>
      </div>
      <div>
        {showReviews ? (
          <div>
            {rvPosts.length > 0 ? (
                <div>
                  <ListType type='review' posts={rvPosts} />
                </div>
        
            ) : (
              <div style={{ textAlign: "center"}}>리뷰글이 없습니다.</div>
            )}
          </div>
        ) : (
          <div>
            {rcmPosts.length > 0 ? (
              
                <div>
                  <ListType type='recommend' posts={rcmPosts} />
                </div>
            ) : (
              <div style={{ textAlign: "center"}}>추천글이 없습니다.</div>
            )}
          </div>
        )}
      </div>
      {(showReviews && rvPostEnd) || (!showReviews && rcmPostEnd) ? (
        <div style={{ textAlign: "center", margin: '20px 0px' }}>더 불러올 게시글이 없습니다.</div>
      ) : null}
    </div>
  )
}

export default LoginPosts;
