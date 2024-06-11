import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {  
  const [userData, setUserData] = useState(() => {
    const userVOString = sessionStorage.getItem('userVO');
    const userVO = userVOString ? JSON.parse(userVOString) : null;
    const userVOString2 = localStorage.getItem('userVO');
    const userVO2 = userVOString2 ? JSON.parse(userVOString2) : null;

    const userId = userVO ? userVO.user_ID : (userVO2 ? userVO2.user_ID : localStorage.getItem('rememberId'));
    const userNick = userVO ? userVO.user_NICK : (userVO2 ? userVO2.user_NICK : '');
    const profileURL = userVO ? userVO.profile_URL : (userVO2 ? userVO2.profile_URL : '');

    return { userId, userNick, profileURL };
  });

  useEffect(() => {
    const fetchUserNo = async () => {
      if (userData.userId) {
        try {
          const response = await axios.get(`/book/user/getUserNo?id=${userData.userId}`);
          const userNo = response.data;
          setUserData(prevData => ({ ...prevData, userNo }));
        } catch (error) {
          console.error("유저 번호 가져오는 도중 오류 발생", error);
        }
      }
    };

    fetchUserNo();
  }, [userData.userId]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
