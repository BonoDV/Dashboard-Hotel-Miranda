import SideBar from "../components/SideBar";
import Header from "../components/Header";
import '../pages/dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard-container">
            <Header />
            <SideBar />
            <div className="main-content">
                {/* Main content */}
            </div>
        </div>
    );
}


export default Dashboard;