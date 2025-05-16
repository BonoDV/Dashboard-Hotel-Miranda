import { Outlet } from "react-router";
import SideBar from "../components/SideBar.tsx";
import Header from "../components/Header.tsx";
import styled from "styled-components";

function Dashboard() {
  return (
    <DashboardLayout>
      <SideBar />
      <MainContentArea>
        <Header />
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </MainContentArea>
    </DashboardLayout>
  );
}

const DashboardLayout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f8f8f8; /* Opcional: color de fondo */
`;

export default Dashboard;
