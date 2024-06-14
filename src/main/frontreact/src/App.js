
import {Route, Routes} from "react-router-dom";
import Main from "./main/Main";
import { UserProvider } from "./context/UserContext";
import MyBook from "./usercomponent/MyBook";
import Loading from "./main/Loading";
import { LoadingProvider } from "./context/LoadingContext";
import UserFeed from "./usercomponent/UserFeed";
import PostDetail from "./postcomponent/PostDetail";
import ModifyPostForm from "./postcomponent/ModifyPostForm ";
import WritePosts from "./usercomponent/WritePosts";

function App() {


    return (
        <UserProvider>
            <LoadingProvider>
                <Routes>
                    <Route path="/" element={<Main/>} />
                    <Route path="/login" element={<Main loginPage/>} />
                    <Route path="/regist" element={<Main registPage/>} />
                    <Route path="/myBook" element={<MyBook/>}/>
                    <Route path="/userFeed/:userNo" element={<UserFeed/>} />
                    <Route path="/post/:type/:postNo" element={<PostDetail/>} />
                    <Route path="/userFeed/post/:type/:postNo" element={<PostDetail/>}/>
                    <Route path="/modifyPost/:type/:postNo" element={<ModifyPostForm/>}/>
                    <Route path="/writePost" element={<WritePosts/>}/>
                </Routes>
            </LoadingProvider>
        </UserProvider>

    );
}

export default App;
