import React, { useState } from 'react';
import axios from 'axios';

const TestApi = () => {
    const [isbn, setIsbn] = useState('');
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setIsbn(e.target.value);
    };

    const searchBookByIsbn = async () => {
        // const apiKey = process.env.REACT_APP_API_KEY;
        // const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${isbn}&key=${apiKey}&maxResults=10`;

        // try {
        //     const response = await axios.get(apiUrl);
        //     if (response.data.items && response.data.items.length > 0) {
        //         setBooks(response.data.items);
        //         setError(null);
        //     } else {
        //         setBooks([]);
        //         setError('책을 찾을 수 없습니다.');
        //     }
        // } catch (error) {
        //     console.error('책 정보를 가져오는 중 에러 발생:', error);
        //     setBooks([]);
        //     setError('책 정보를 가져오는 중 에러가 발생했습니다.');
        // }

      const search = '책 ' + isbn;
      const API_KEY = process.env.REACT_APP_API_KEY;
      const CX = process.env.REACT_APP_ENGINE_ID;
      const encodedBookTitle = encodeURIComponent(search);
      const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodedBookTitle}&searchType=image`;

      const response = await axios.get(searchUrl);
      if (response.data.items && response.data.items.length > 0) {
          setBooks(response.data.items);
          setError(null);
          console.log(response.data );
      } else {
          setBooks([]);
          setError('책을 찾을 수 없습니다.');
      }
    };

    return (
        <div>
            <h1>Google Books ISBN 검색</h1>
            <input
                type="text"
                value={isbn}
                onChange={handleInputChange}
                placeholder="ISBN 입력"
            />
            <button onClick={searchBookByIsbn}>검색</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {/* {books.length > 0 && (
                <div>
                    {books.map((book, index) => (
                        <div key={index}>
                            <h2>{book.volumeInfo.title}</h2>
                            <p>{book.volumeInfo.authors?.join(', ')}</p>
                            <p>{book.volumeInfo.publisher}</p>
                            <p>{book.volumeInfo.publishedDate}</p>
                            <img style={{width:'210px'}} src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                            <p>{book.volumeInfo.description}</p>
                        </div>
                    ))}
                </div>
            )} */}
             <div>             
          {/* 이미지 표시 및 스타일링 */}
            {books.length > 0 && books.map((image, index) => (
              <img key={index} src={image.link} alt={`Book ${index + 1}`}className="modalWrite-bookImage"/>
            ))}
        </div>
        </div>
    );
};

export default TestApi;
