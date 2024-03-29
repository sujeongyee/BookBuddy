import Sidebar from "./Sidebar";
import './sidebar.css';

function Main(){
    return(
        <div className="mainContainer">
            <div className="side">
                <Sidebar/>
            </div>

            <div className="mainContent">
                <h3>내용을 추가추가</h3>
            </div>
        </div>
    );
}
export default Main