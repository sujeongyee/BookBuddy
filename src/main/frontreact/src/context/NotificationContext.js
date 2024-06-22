
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from "../context/UserContext";
const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const { userData } = useUser();
    const { userNo } = userData;
    const [notiCnt, setNotiCnt] = useState(0);
    
    useEffect(()=>{

      const fetchNotiData = async() => {
        
        try {
            const response = await axios.get(`/book/user/getUnReadNotification?userNo=${userNo}`);
            setNotiCnt(response.data);
        } catch (error) {
            console.error('알림 수 가져오기 중 에러 발생', error);
        }
        
      }
      if(userNo) fetchNotiData();
    },[userNo])

    return (
        <NotificationContext.Provider value={{ notiCnt, setNotiCnt }}>
            {children}
        </NotificationContext.Provider>
    );
};
