import { BiChevronDown } from "react-icons/bi";
import { JSX, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGuests } from "../../redux/features/guests/guestsSlice.js";
import { useNavigate } from "react-router";
import Table from "../../components/Table.tsx";
import Image from "../../components/Image.tsx";
import StatusButton, {
  StatusType,
} from "../../components/buttons/StatusButton.tsx";
import styled from "styled-components";
import SpecialRequestButton from "../../components/buttons/SpecialRequestButton.tsx";
import { useState } from "react";
import Modal from "../../components/Modal.tsx";

import { RootState, AppDispatch } from "./../../redux/store/store.ts";
import { Guest } from "../../type/Guest.ts";
function Users() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Seleccionamos los datos desde el store
  const { guests, loading, error } = useSelector(
    (state: RootState) => state.guest
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pestañas
  const [selectedTab, setSelectedTab] = useState("all");
  useEffect(() => {
    dispatch(fetchGuests());
  }, [dispatch]);

  const cols = [
    "Guest",
    "Order Date",
    "Check In",
    "Check Out",
    "Special Request",
    "Room Type",
    "Status",
  ];
  // Calcular el rango de habitaciones a mostrar
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredGuests = guests.filter((guest: Guest) => {
    if (selectedTab === "all") return true;
    return guest.status && guest.status.toLowerCase() === selectedTab;
  });
  const paginatedGuests = filteredGuests.slice(startIndex, endIndex);

  const handleAdd = () => {
    navigate(`/dashboard/booking/new`);
  };

  const handleOpenModal = (text: string) => {
    setModalContent(text);
    setIsModalOpen(true);
  };

  const data = Array.isArray(paginatedGuests)
    ? paginatedGuests.map((res: Guest) => ({
        Guest: (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image src={res.image} alt="Guest" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
              }}
            >
              <span>{res.name}</span>
              <span>#{res.id}</span>
            </div>
          </div>
        ),
        id: res.id,
        "Order Date": res.orderDate,
        "Check In": `${res.checkIn}`,
        "Check Out": `${res.checkOut}`,
        "Special Request": (
          <SpecialRequestButton
            specialRequest={
              res.specialRequest &&
              res.specialRequest.status !== false &&
              res.specialRequest.text
                ? res.specialRequest.text
                : "None Request"
            }
            onClick={() =>
              res.specialRequest &&
              res.specialRequest.status !== false &&
              res.specialRequest.text
                ? handleOpenModal(res.specialRequest.text)
                : ""
            }
          />
        ),

        "Room Type": res.roomType,
        Status: <StatusButton buttonStatus={res.status as StatusType} />,
      }))
    : [];

  if (loading) return <div>Loading guests...</div>;
  if (error) return <div>Error loading guests: {error}</div>;

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredGuests.length / itemsPerPage);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Tabs>
          <Tab
            active={selectedTab === "all"}
            onClick={() => {
              setSelectedTab("all");
              setCurrentPage(1);
            }}
          >
            All Guest
          </Tab>
          <Tab
            active={selectedTab === "pending"}
            onClick={() => {
              setSelectedTab("pending");
              setCurrentPage(1);
            }}
          >
            Pending
          </Tab>
          <Tab
            active={selectedTab === "booked"}
            onClick={() => {
              setSelectedTab("booked");
              setCurrentPage(1);
            }}
          >
            Booked
          </Tab>
          <Tab
            active={selectedTab === "cancelled"}
            onClick={() => {
              setSelectedTab("cancelled");
              setCurrentPage(1);
            }}
          >
            Canceled
          </Tab>
          <Tab
            active={selectedTab === "refund"}
            onClick={() => {
              setSelectedTab("refund");
              setCurrentPage(1);
            }}
          >
            Refund
          </Tab>
        </Tabs>
        <SortMenu>
          <SortButton>
            Newest <BiChevronDown />
          </SortButton>
        </SortMenu>
      </div>
      <button onClick={() => handleAdd()}>+</button>
      <TableContainer>
        <TableWrapper>
          <Table cols={cols} data={data} basePath={"booking"} />
        </TableWrapper>
      </TableContainer>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Special Request</h2>
        <p>{modalContent}</p>
      </Modal>
      {/* Controles de paginación */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Users;

interface TabProps {
  active?: boolean;
}

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  position: relative;
`;

const Tabs = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
`;

const Tab = styled.div<TabProps>`
  font-weight: 500;
  color: ${({ active }) => (active ? "#135846" : "#888")};
  border-bottom: ${({ active }) => (active ? "2px solid #135846" : "none")};
  padding-bottom: 8px;
  cursor: pointer;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const SortMenu = styled.div`
  top: 24px;
  right: 24px;
`;

const SortButton = styled.button`
  background: transparent;
  border: 1px solid #135846;
  border-radius: 12px;
  padding: 8px 16px;
  font-weight: 500;
  cursor: pointer;
  height: 50px;
  width: 130px;
`;
