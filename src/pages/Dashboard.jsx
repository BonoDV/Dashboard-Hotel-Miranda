import SideBar from "../components/SideBar";
import Header from "../components/Header";
import styled from 'styled-components';

function Dashboard() {
    return (
        <DashboardContainer>
            <Header />
            <SideBar />
            <MainContentContainer>
                {/* Main content */}
            </MainContentContainer>
        </DashboardContainer>
    );
}

const DashboardContainer = styled.div`
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr;
    min-height: 100vh;

    &>Header {
        grid-column: 2;
        grid-row: 1;
    }
    &>SideBar {
        grid-column: 1;
        grid-row: 1 / span 2;
    }
`;

const MainContentContainer = styled.div`
    grid-column: 2;
    grid-row: 2;
    padding: 20px;

`;


export default Dashboard;