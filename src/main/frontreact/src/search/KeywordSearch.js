
import { useParams, useHistory } from 'react-router-dom';
import Sidebar from '../main/Sidebar';
import Header from '../main/Header';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useLoading } from "../context/LoadingContext";
import ToastMsg from '../main/ToastMsg';
import { useNavigate } from 'react-router-dom';

const KeywordSearch = () => {
  const {kwdNo} = useParams();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  return (
    <div className="mainContainer">
      <div className="side">
        <Sidebar />
      </div>
      <div className="mainContent2">
        <Header />        
        <div className="mainSection">
        </div>
      </div>  
    </div>
  )

}
export default KeywordSearch