import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Main from './main/Main';
import { UserProvider } from './context/UserContext';
import MyBook from './usercomponent/MyBook';
import Loading from './main/Loading';
import { LoadingProvider } from './context/LoadingContext';
import UserFeed from './usercomponent/UserFeed';
import PostDetail from './postcomponent/PostDetail';
import WritePosts from './usercomponent/WritePosts';
import { NotificationProvider } from './context/NotificationContext.js';
import TestApi from './main/TestApi.js';
import CategorySearch from './search/CategorySearch.js';
import KeywordSearch from './search/KeywordSearch.js';
import { PermissionProvider } from './context/PermissionContext.js';
import { useNavigate } from 'react-router-dom';

function PrivateRoute({ element, ...rest }) {
    const navigate = useNavigate();
    const userVOString = sessionStorage.getItem('userVO');
    const userVO = userVOString ? JSON.parse(userVOString) : null;
    const userVOString2 = localStorage.getItem('userVO');
    const userVO2 = userVOString2 ? JSON.parse(userVOString2) : null;
    const userNick = userVO ? userVO.user_NICK : (userVO2 ? userVO2.user_NICK : '');

    if (!userNick) {
        // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
        alert('로그인 후 이용해주세요!');
        return <Navigate to="/login" />;
    }

    // 로그인한 경우 요청된 element를 렌더링
    return <Route {...rest} element={element} />;
}

function App() {
    return (
        <UserProvider>
            <LoadingProvider>
                <NotificationProvider>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/testApi" element={<TestApi />} />
                        <Route path="/login" element={<Main loginPage />} />
                        <Route path="/regist" element={<Main registPage />} />
                        <Route element={<PrivateRoute/>} >
                            <Route path="/myBook" element={<MyBook />} />
                            <Route path="/userFeed/:userNo" element={<UserFeed />} />
                            <Route path="/post/:type/:postNo" element={<PostDetail />} />
                            <Route path="/userFeed/post/:type/:postNo" element={<PostDetail />} />
                            <Route path="/modifyPost" element={<WritePosts />} />
                            <Route path="/writePost" element={<WritePosts />} />
                            <Route path="/cateSearch/:cateNo" element={<CategorySearch />} />
                            <Route path="/kwdSearch/:kwdNo" element={<KeywordSearch />} />
                        </Route>
                    </Routes>
                </NotificationProvider>
            </LoadingProvider>
        </UserProvider>
    );
}

export default App;
