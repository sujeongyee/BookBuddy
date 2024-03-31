
import {Route, Routes} from "react-router-dom";
import Main from "./main/Main";

function App() {
    return (
      <>
          <Routes>
              <Route path="/" element={<Main/>} />
              <Route path="/login" element={<Main loginPage/>} />
              <Route path="/regist" element={<Main registPage/>} />
          </Routes>

      </>

    );
}

export default App;
