import { BiChevronDown } from "react-icons/bi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGuests } from "./../../redux/features/guests/guestsSlice.js";
import { useNavigate } from "react-router";
import Table from "../../components/Table";
import Image from "../../components/Image.jsx";
import StatusButton from "./../../components/buttons/StatusButton.tsx";
import styled from "styled-components";
import SpecialRequestButton from "./../../components/buttons/SpecialRequestButton.tsx";
import { useState } from "react";
import Modal from "./../../components/Modal.jsx";
function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Seleccionamos los datos desde el store
  const { guests, loading, error } = useSelector((state) => state.guest);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

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

  const handleAdd = () => {
    navigate(`/dashboard/booking/new`);
  };

  const handleOpenModal = (text) => {
    setModalContent(text);
    setIsModalOpen(true);
  };

  const data = guests.map((res) => ({
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
    "Check In": `${res.checkIn.date} at ${res.checkIn.hour}`,
    "Check Out": `${res.checkOut.date} at ${res.checkOut.hour}`,
    "Special Request": (
      <SpecialRequestButton
        specialRequest={
          res.specialRequest && res.specialRequest.text
            ? res.specialRequest.text
            : "None Request"
        }
        onClick={() =>
          res.specialRequest && res.specialRequest.text
            ? handleOpenModal(res.specialRequest.text)
            : null
        }
      />
    ),

    "Room Type": res.roomType,
    Status: <StatusButton buttonStatus={res.status} />,
  }));

  if (loading) return <div>Loading guests...</div>;
  if (error) return <div>Error loading guests: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Tabs>
          <Tab active>All Guest</Tab>
          <Tab>Pending</Tab>
          <Tab>Booked</Tab>
          <Tab>Canceled</Tab>
          <Tab>Refund</Tab>
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
    </div>
  );
}

export default Users;

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

const Tab = styled.div`
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
