import React, { useEffect } from 'react';
import {useNavigate, Outlet } from 'react-router-dom';

const PermissionComponent = () => {

  const navigate = useNavigate();
  const userVOString = sessionStorage.getItem('userVO');
  const userVO = userVOString ? JSON.parse(userVOString) : null;
  const userVOString2 = localStorage.getItem('userVO');
  const userVO2 = userVOString2 ? JSON.parse(userVOString2) : null;

  const userId = userVO ? userVO.user_ID : (userVO2 ? userVO2.user_ID : localStorage.getItem('rememberId'));
  const userNick = userVO ? userVO.user_NICK : (userVO2 ? userVO2.user_NICK : '');
  const profileURL = userVO ? userVO.profile_URL : (userVO2 ? userVO2.profile_URL : '');

  useEffect(()=>{
    if(!userNick){
      alert('로그인 후 이용해주세요');
      navigate('/login');
    }
  },[userNick])

  return(
    <Outlet/>
  )
}
export default PermissionComponent