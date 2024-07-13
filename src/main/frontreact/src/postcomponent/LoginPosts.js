import { useEffect, useState } from "react"
import axios from "axios";
import { useUser } from '../context/UserContext';
import ListType from "../search/ListType";

const LoginPosts = () => {

  const {userData} = useUser();
  const {userId,userNo} = userData;

  const [showReviews, setShowReviews] = useState(false);
  const [rcmPosts,setRcmPosts] = useState([]);
  const [rvPosts,setRvPosts] = useState([]);

  useEffect(()=>{

    const fetchData = async () => {
      try {
        if (userNo != '' && userNo) {
          console.log(userNo);
          const response = await axios.get(`/book/post/getLoginFeed?userNo=${userNo}`);
          console.log(response.data);
          setRcmPosts(response.data.recommendList);
          setRvPosts(response.data.reviewList);
        }      
      } catch (error) {
          console.error('데이터 가져오기 에러:', error);
      }
    };

    fetchData();

  },[userId,userNo])

  const handleTypeChange = (e) => {
    setShowReviews(e);
  }

  return (
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
      <div>
        <span className='containsCheck'>팔로우 중인 버디의 게시물을 최신순으로 보여드려요!</span>
      </div>
      <div>
        {showReviews ? (
                  <div>
                    <ListType type='review' posts={rvPosts} />
                  </div>
                ) : (
                  <div>
                    <ListType type='recommend' posts={rcmPosts} />
                  </div>
                )}
      </div>
    </div>
  )
}

export default LoginPosts