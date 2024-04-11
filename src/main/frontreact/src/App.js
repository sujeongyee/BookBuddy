
import {Route, Routes} from "react-router-dom";
import Main from "./main/Main";
import { UserProvider } from "./context/UserContext";

function App() {


    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/login" element={<Main loginPage/>} />
                <Route path="/regist" element={<Main registPage/>} />
            </Routes>
        </UserProvider>

    );
}

export default App;
