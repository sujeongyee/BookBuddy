import Sidebar from './Sidebar';
import Header from './Header';
import './sidebar.css';

function Main(){
    return(
        <div className="mainContainer">
            <div className="side">
                <Sidebar/>
            </div>               
            <div className="mainContent">
                <Header/>
                <h3>내용을 추가추가</h3>
            </div>
        </div>
    );
}
export default Main