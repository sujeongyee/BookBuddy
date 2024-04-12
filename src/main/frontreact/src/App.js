
import {Route, Routes} from "react-router-dom";
import Main from "./main/Main";
import { UserProvider } from "./context/UserContext";
import MyBook from "./usercomponent/MyBook";

function App() {


    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/login" element={<Main loginPage/>} />
                <Route path="/regist" element={<Main registPage/>} />
                <Route path="/myBook" element={<MyBook/>}/>
            </Routes>
        </UserProvider>

    );
}

export default App;
