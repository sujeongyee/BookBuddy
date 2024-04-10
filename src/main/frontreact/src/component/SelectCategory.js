import {useState, useEffect } from "react";

function SelectCategory({ setSelectedCategories }){

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategoriesLocal] = useState([]);

  useEffect(()=>{
    async function fetchCategories() {
      try {
        const response = await fetch("/book/getAllCategories");
        if (!response.ok) {
          throw new Error("서버에서 카테고리 리스트를 가져오지 못했습니다.");
        }
        const data = await response.json();
        setCategories(data); // 카테고리 리스트 설정
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
  },[]);

  const handleClick = (category) => {
     // 이미 선택된 카테고리를 클릭한 경우 제거
    if (selectedCategories.includes(category)) {
      setSelectedCategoriesLocal(selectedCategories.filter((c) => c !== category));
    } else {
      // 선택되지 않은 카테고리를 클릭한 경우 추가
      setSelectedCategoriesLocal([...selectedCategories, category]);
    }
  };

  useEffect(() => {
    // 부모 컴포넌트로 선택된 카테고리 리스트 업데이트
    setSelectedCategories(selectedCategories);
  }, [selectedCategories, setSelectedCategories]);


  return(
    <>
      <div className='regist-cate'>
        <p className="regist-cate-p">선호하는 카테고리</p>
        <p className="regist-cate-p2">{`${selectedCategories.length}개 선택됨`}</p>
      </div>
      <div className="regist-category-select">
        <ul>
          {categories.map((category) => (
            <li
            key={category.category_NO}
            className={selectedCategories.includes(category.category_NO) ? "active" : ""}
            onClick={() => handleClick(category.category_NO)}
          >{category.category_NAME}</li>
          ))}
        </ul>
      </div>
    </>                    
  );
}
export default SelectCategory