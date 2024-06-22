import NotificationComponent from '../component/NotificationComponent';
import React, { useEffect, useState } from 'react';
import './sidebar.css';
import { useUser } from "../context/UserContext";
import axios from 'axios';
import NotificationModal from './NotificationModal';
import { useNotification } from "../context/NotificationContext";
function Header(){
    const { userData } = useUser();
    const { userId, userNo } = userData;
    //const [notiCnt, setNotiCnt] = useState(0);
    const [bellModal, setBellModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { notiCnt, setNotiCnt } = useNotification();
    // useEffect(() => {
    //     const fetchNotifications = async () => {
    //         if (userNo) {
    //             try {
    //                 const response = await axios.get(`/book/user/getUnReadNotification?userNo=${userNo}`);
    //                 setLoading(true);
    //                 setNotiCnt(response.data);
    //             } catch (error) {
    //                 console.error('알림 수 가져오기 중 에러 발생', error);
    //             }
    //         }
    //     };

    //     fetchNotifications();
    // }, [userNo]);

    

    const handleSearchAll = () => {
        console.log('검색');
    }

    const bellModalOpen = () => {
        setBellModal(true);
    }

    return (
        <div className="header-bar">
            <div className='search-zone'>
                <div className="search-all-wrapper">           
                    <input type="text" className='search-all' placeholder='검색하실 버디 닉네임/책 제목/글 내용을 입력해주세요'></input>
                    <svg onClick={handleSearchAll} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search allSearch" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </div>
            </div>
            <NotificationComponent notiCnt={notiCnt} setNotiCnt={(e)=>setNotiCnt(e)} />
            
            <div className="headerIcon">
                <NotificationModal isOpen={bellModal} onRequestClose={() => { setBellModal(false) }} notiCnt={notiCnt} setNotiCnt={setNotiCnt} />
                <div className="bell-icon" onClick={() => bellModalOpen()} style={{cursor: 'pointer'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="27" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                    </svg>
                    <div className="new-bell">{notiCnt}</div>
                </div>

                <div className="chat-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="27" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
                    </svg>
                    <div className="new-chat">12</div>
                </div>
            </div>
        </div>
    );
}

export default Header;