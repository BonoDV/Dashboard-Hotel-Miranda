import { useEffect, useState } from "react";

import Table from "../../components/Table.tsx";
import Image from "../../components/Image.tsx";
import StatusButton, {
  StatusType,
} from "../../components/buttons/StatusButton.tsx";
import Pagination from "../../components/Pagination.tsx";

import { useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../../redux/features/rooms/roomsSlice.ts";
import { fetchGuests } from "../../redux/features/guests/guestsSlice.ts";
import { RootState, AppDispatch } from "../../redux/store/store.ts";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

function Rooms() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { rooms, loading, error } = useSelector(
    (state: RootState) => state.room
  );
  const { guests } = useSelector((state: RootState) => state.guest);

  const { t } = useTranslation();

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchGuests());
  }, [dispatch]);

  useEffect(() => {
    if (guests.length > 0 && rooms.length > 0) {
      (
        "Guests completos:",
        guests.map((g) => ({
          roomNumber: g.roomNumber,
          status: g.status,
        }))
      );
      ("Ejemplo de comparación para la primera habitación:");
      const firstRoom = rooms[0];
      (
        "Room number:",
        firstRoom.roomNumber,
        "tipo:",
        typeof firstRoom.roomNumber
      );
      const matchingGuest = guests.find(
        (g) => g.roomNumber.toString() === firstRoom.roomNumber.toString()
      );
      (
        "Guest encontrado:",
        matchingGuest,
        "status:",
        matchingGuest?.status
      );
    }
  }, [guests, rooms]);

  const handleAdd = () => {
    navigate(`/dashboard/room/new`);
  };

  const cols = [
    t("rooms_table_room_name"),
    t("rooms_table_room_type"),
    t("rooms_table_room_floor"),
    t("rooms_table_room_facilities"),
    t("rooms_table_room_rate"),
    t("rooms_table_room_status"),
  ];

  // Calcular el rango de habitaciones a mostrar
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRooms = rooms.slice(startIndex, endIndex);

  // Mapeamos los datos de ConciergeList
  const data = paginatedRooms.map((res) => ({
    [t("rooms_table_room_name")]: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image
          src={res.photos[0]}
          alt="Room Photo"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "10px",
          }}
        >
          <span>#{res.roomNumber}</span>
          <span>{res.roomType}</span>
        </div>
      </div>
    ),
    id: res.roomNumber,
    [t("rooms_table_room_type")]: res.bedType,
    [t("rooms_table_room_floor")]: res.roomFloor,
    [t("rooms_table_room_facilities")]: res.amenities.join(", "),
    [t("rooms_table_room_rate")]: "$" + res.price + " /night",
    [t("rooms_table_room_status")]: (
      <StatusButton
        useRedForBooked={true}
        buttonStatus={(() => {
          const matchingGuest = guests.find(
            (guest) => guest.roomNumber.toString() === res.roomNumber.toString()
          );

          (`Room ${res.roomNumber} - Guest:`, matchingGuest?.status);

          if (matchingGuest) {
            const status = matchingGuest.status.toLowerCase();
            if (status === "pending" || status === "booked") {
              (
                `Room ${res.roomNumber} is Booked (status: ${status})`
              );
              return "Booked";
            } else if (status === "refund" || status === "cancelled") {
              (
                `Room ${res.roomNumber} is Refund (status: ${status})`
              );
              return "Available";
            }
          }

          (
            `Room ${res.roomNumber} is Check In (no matching guest or invalid status)`
          );
          return "Check In";
        })()}
      />
    ),
  }));

  if (loading) return <div>{t("loading_rooms")}</div>;
  if (error)
    return (
      <div>
        {t("loading_rooms_error")} {error}
      </div>
    );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(rooms.length / itemsPerPage);

  return (
    <div style={{ padding: "20px" }}>
      <SortButton onClick={() => handleAdd()}>
        {t("rooms_button_new_room")} +
      </SortButton>
      {/* Componente de la tabla */}
      <Table cols={cols} data={data} basePath={"room"} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Rooms;

const SortButton = styled.button`
  background: transparent;
  border: 1px solid #135846;
  border-radius: 12px;
  padding: 8px 16px;
  font-weight: 500;
  cursor: pointer;
  height: fit-content;
  width: fit-content;
  font-family: "Poppins", sans-serif;
  margin-left: 92%;
  margin-bottom: 20px;
`;
