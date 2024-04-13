import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {

    const userId = sessionStorage.getItem('user_Id') || localStorage.getItem('rememberId');
    const userNick = sessionStorage.getItem('user_Nick') || localStorage.getItem('rememberNick');
    console.log(userId);
    console.log(userNick);
    if (userId && userNick) {
      return { userId, userNick };
    } else if (userNick) {
      return { userNick };
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
