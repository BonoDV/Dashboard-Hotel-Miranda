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
import Pagination from "../../components/Pagination.tsx";

import { RootState, AppDispatch } from "./../../redux/store/store.ts";
import { Guest } from "../../type/Guest.ts";
import { useTranslation } from "react-i18next";
import { formatDateTimeDisplay } from "../../utils/dateUtils";
import { Helmet } from "react-helmet";
function Users() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();
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
    t("bookings_table_guest"),
    t("bookings_table_order_date"),
    t("bookings_table_check_in"),
    t("bookings_table_check_out"),
    t("bookings_table_special_request"),
    t("bookings_table_room_type"),
    t("bookings_table_status"),
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
        [t("bookings_table_guest")]: (
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
        [t("bookings_table_order_date")]: formatDateTimeDisplay(res.orderDate),
        [t("bookings_table_check_in")]: formatDateTimeDisplay(res.checkIn),
        [t("bookings_table_check_out")]: formatDateTimeDisplay(res.checkOut),
        [t("bookings_table_special_request")]: (
          <SpecialRequestButton
            specialRequest={
              res.specialRequest &&
              res.specialRequest.status !== false &&
              res.specialRequest.text
                ? res.specialRequest.text
                : t("bookings_special_request_false")
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

        [t("bookings_table_room_type")]: res.roomType,
        [t("bookings_table_status")]: (
          <StatusButton buttonStatus={res.status as StatusType} />
        ),
      }))
    : [];

  if (loading) return <div>{t("loading_bookings")}</div>;
  if (error)
    return (
      <div>
        {t("loading_bookings_error")} {error}
      </div>
    );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredGuests.length / itemsPerPage);

  return (
    <>
      <Helmet>
        <title>Bookings</title>
        <meta
          name="description"
          content="Bookings page for Hotel Management System"
        />
      </Helmet>

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
              {t("bookings_all_guest_table_tab")}
            </Tab>
            <Tab
              active={selectedTab === "pending"}
              onClick={() => {
                setSelectedTab("pending");
                setCurrentPage(1);
              }}
            >
              {t("bookings_pending_table_tab")}
            </Tab>
            <Tab
              active={selectedTab === "booked"}
              onClick={() => {
                setSelectedTab("booked");
                setCurrentPage(1);
              }}
            >
              {t("bookings_booked_table_tab")}
            </Tab>
            <Tab
              active={selectedTab === "cancelled"}
              onClick={() => {
                setSelectedTab("cancelled");
                setCurrentPage(1);
              }}
            >
              {t("bookings_canceled_table_tab")}
            </Tab>
            <Tab
              active={selectedTab === "refund"}
              onClick={() => {
                setSelectedTab("refund");
                setCurrentPage(1);
              }}
            >
              {t("bookings_refund_table_tab")}
            </Tab>
          </Tabs>
          <AddMenu>
            <AddButton onClick={() => handleAdd()}>
              {t("bookings_button_new_booking")} +
            </AddButton>
          </AddMenu>
        </div>

        <TableContainer>
          <TableWrapper>
            <Table cols={cols} data={data} basePath={"booking"} />
          </TableWrapper>
        </TableContainer>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>{t("bookings_table_special_request")}</h2>
          <p>{modalContent}</p>
        </Modal>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}

export default Users;

interface TabProps {
  active?: boolean;
}

const TableContainer = styled.div`
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

const AddMenu = styled.div`
  top: 24px;
  right: 24px;
`;

const AddButton = styled.button`
  background: transparent;
  border: 1px solid #135846;
  border-radius: 12px;
  padding: 8px 16px;
  font-weight: 500;
  cursor: pointer;
  height: 50px;
  width: fit-content;
  font-family: "Poppins", sans-serif;

  &:hover {
    background-color: #a5edc6;
  }
`;
