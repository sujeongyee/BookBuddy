import { useState, useEffect } from "react";

function SelectCategory({ setSelectedCategories, msg, cate }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategoriesLocal] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/book/getAllCategories");
        if (!response.ok) {
          throw new Error("서버에서 카테고리 리스트를 가져오지 못했습니다.");
        }
        const data = await response.json();
        setCategories(data); 
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    if (cate) {
      const categoriesArray = cate.split(',');
      setSelectedCategoriesLocal(categoriesArray);
    }
  }, [cate]);

  useEffect(() => {
    setSelectedCategories(selectedCategories);
  }, [selectedCategories, setSelectedCategories]);

  const handleClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategoriesLocal(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategoriesLocal([...selectedCategories, category]);
    }
  };


  return (
    <>
      <div className='regist-cate'>
        {msg ? <p className="regist-cate-p">이 책의 카테고리</p> : <p className="regist-cate-p">선호하는 카테고리</p>}
        <p className="regist-cate-p2">{`${selectedCategories.length}개 선택됨`}</p>
      </div>
      <div className="regist-category-select">
        <ul>
          {categories.map((category) => (
            <li
              key={category.category_NO}
              className={selectedCategories.includes(category.category_NO) ? "active" : ""}
              onClick={() => handleClick(category.category_NO)}
            >
              {category.category_NAME}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SelectCategory;
