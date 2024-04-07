import {useState, useEffect } from "react";

function SelectKeyword(){

  const [keywords, setKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  useEffect(()=>{
    async function fetchKeywords() {
      try {
        const response = await fetch("/book/getAllKeywords");
        if (!response.ok) {
          throw new Error("서버에서 카테고리 리스트를 가져오지 못했습니다.");
        }
        const data = await response.json();
        setKeywords(data); // 카테고리 리스트 설정
      } catch (error) {
        console.error(error);
      }
    }

    fetchKeywords();
  },[]);

  const handleClick = (keywords) => {
     // 이미 선택된 키워드를 클릭한 경우 제거
    if (selectedKeywords.includes(keywords)) {
      setSelectedKeywords(selectedKeywords.filter((c) => c !== keywords));
    } else {
      // 선택되지 않은 키워드를 클릭한 경우 추가
      setSelectedKeywords([...selectedKeywords, keywords]);
    }
  };

  return(
    <div className="reigst-k">
        <div className='regist-kwd'>
          <p className='regist-kwd-p'>선호하는 키워드</p>
          <p className='regist-kwd-p2'>{`${selectedKeywords.length}개 선택됨`}</p>
        </div>
        <div className='regist-select-kwd'>
          <ul>
            {keywords.map((keywords) => (
              <li
                key={keywords.keyword_NO}
                className={selectedKeywords.includes(keywords) ? "active" : ""}
                onClick={() => handleClick(keywords)}
              >{keywords.keyword_NAME}</li>
            ))}
          </ul>
        </div>
    </div>
  )
}
export default SelectKeyword