import React, { useState, useEffect } from "react";
import "../main/sidebar.css";
import "../main/main.css";
import axios from "axios";
import { useUser } from "../context/UserContext";
import Sidebar from "../main/Sidebar";
import Header from "../main/Header";

function MyBook() {

  const {userData ,setUserData} = useUser();
  const {userId,userNick} = userData;

  useEffect(()=>{
    const response = axios.get(`/book/user/myPage?id=${userId}`);
  },[])

  return (
    <div className="mainContainer">
      <div className="side">
        <Sidebar />
      </div>
      <div className="mainContent">
        <Header/>
      </div>
    </div>
  );
}
export default MyBook;
