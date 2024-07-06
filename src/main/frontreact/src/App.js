import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import PermissionComponent from './component/PermissionComponent.js';

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

                        {/* 로그인 시 접근 가능 */}
                        <Route element={<PermissionComponent />}>
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
