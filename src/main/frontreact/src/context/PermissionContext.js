import React, { createContext, useContext, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const PermissionContext = createContext();

export const usePermission = () => useContext(PermissionContext);

export const PermissionProvider = ({ children }) => {
    const { userData } = useUser();
    const { userNo } = userData;
    const navigate = useNavigate();

    useEffect(() => {
        if (!userNo) {
            alert('게시물은 로그인 하셔야 볼 수 있습니다.');
            navigate('/login');
        }
    }, [userNo, navigate]); 

    return (
        <PermissionContext.Provider value={{ userData }}>
            {children}
        </PermissionContext.Provider>
    );
};
