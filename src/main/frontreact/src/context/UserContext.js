import React, { createContext, useContext, useState } from 'react';

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


    if (userId && userNick) {
      return { userId, userNick,profileURL };
    } else {
      return {};
    }
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
