import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./searchbook.css";

const SearchBook = ({ isOpen, onRequestClose, bookTitle,setBook, status, bookSelect, bookCheck }) => {
  const [bookList, setBookList] = useState([]);
  const [localBookSelect, setLocalBookSelect] = useState(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const KAKAO_KEY = process.env.REACT_APP_KAKAO_BOOK_API_KEY;
        const Kakao = axios.create({
          baseURL: "https://dapi.kakao.com",
          headers: {
            Authorization: "KakaoAK " + KAKAO_KEY
          }
        });
        const params = {
          query: bookTitle,
          size: 10,
          target: "title"
        };
        const result = await Kakao.get("/v3/search/book", { params });
        if (result.data.documents.length === 0) {
          alert('책 검색 정보가 없습니다.');
          handleComplete();
        }
        setBookList(result.data.documents);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    if (status === "on" && bookTitle) {
      fetchBookData();
    } else if (status === "on" && !bookTitle) {
      alert('책 제목을 입력해주세요');
      handleComplete();
    }
  }, [status, bookTitle]);

  const handleComplete = () => {
    if (localBookSelect) {
      bookSelect(localBookSelect);
      bookCheck(true);
      setBook(localBookSelect.title);
      setBookList([]);
      onRequestClose();
    } else {
      onRequestClose();
    }
  };

  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    content: {
      position: "relative",
      top: "auto",
      left: "auto",
      right: "auto",
      bottom: "auto",
      maxWidth: "1000px",
      width: "765px",
      maxHeight: "626px",
      padding: "0px",
      border: "none",
      borderRadius: "12px",
      backgroundColor: "#f3f7ff",
      boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
      height: "auto",
      overflowY: "auto"
    }
  };
  const placeholderImage = process.env.PUBLIC_URL + '/imgs/img-notExist.png';

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customModalStyles} contentLabel="모달">
      {bookList.length > 0 ? (
        <div className="book-list">
          <div className="header">
            <h3>책을 선택해주세요</h3>
            <button onClick={handleComplete} className="complete-button">완료</button>
          </div>
          {bookList.map((book, index) => (
            <div
              className={`book-item ${localBookSelect === book ? "selected" : ""}`}
              key={index}
              onClick={() => setLocalBookSelect(book)}
            >
              <img
                src={book.thumbnail ? book.thumbnail : placeholderImage}
                alt={book.title}
                className="book-thumbnail"
                onError={(e) => { e.target.src = placeholderImage }}
              />
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-authors">{book.authors.join(", ")}</p>
                <p className="book-contents">{book.contents}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </Modal>
  );
};

export default SearchBook;
