import {useState, useEffect } from "react";

function SelectKeyword({ setSelectedKeywords,msg,kwd }){

  const [keywords, setKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywordsLocal] = useState([]);

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
    if (selectedKeywords.includes(keywords)) {
      setSelectedKeywordsLocal(selectedKeywords.filter((c) => c !== keywords));
    } else {
      setSelectedKeywordsLocal([...selectedKeywords, keywords]);
    }
  };

  useEffect(() => {
    setSelectedKeywords(selectedKeywords);
  }, [selectedKeywords, setSelectedKeywords]);

  useEffect(()=>{
    if (kwd) {
      const categoriesArray = kwd.split(',');
      setSelectedKeywordsLocal(categoriesArray);
    }
  },[kwd])

  return(
    <div className="reigst-k">
        <div className='regist-kwd'>
          {msg?<p className='regist-kwd-p'>이 책의 키워드</p>:<p className='regist-kwd-p'>선호하는 키워드</p>}
          <p className='regist-kwd-p2'>{`${selectedKeywords.length}개 선택됨`}</p>
        </div>
        <div className='regist-select-kwd'>
          <ul>
            {keywords.map((keywords) => (
              <li
                key={keywords.keyword_NO}
                className={selectedKeywords.includes(keywords.keyword_NO) ? "active" : ""}
                onClick={() => handleClick(keywords.keyword_NO)}
              >{keywords.keyword_NAME}</li>
            ))}
          </ul>
        </div>
    </div>
  )
}
export default SelectKeyword