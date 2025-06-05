import { useEffect, useState } from "react";

import Table from "../../components/Table.tsx";
import Image from "../../components/Image.tsx";

import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../../redux/features/rooms/roomsSlice.ts";
import { RootState, AppDispatch } from "../../redux/store/store.ts";

function Rooms() {
  const dispatch = useDispatch<AppDispatch>();
  const { rooms, loading, error } = useSelector(
    (state: RootState) => state.room
  );

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const cols = [
    "Room Name",
    "Bed Type",
    "Room Floor",
    "Facilities",
    "Rate",
    "Status",
  ];

  // Calcular el rango de habitaciones a mostrar
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRooms = rooms.slice(startIndex, endIndex);

  // Mapeamos los datos de ConciergeList
  const data = paginatedRooms.map((res) => ({
    "Room Name": (
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
    "Bed Type": res.bedType,
    "Room Floor": res.roomFloor,
    Facilities: res.amenities.join(", "),
    Rate: "$" + res.price + " /night",
    Status: res.status ? "Avalaible" : "Booked",
  }));

  if (loading) return <div>Loading guests...</div>;
  if (error) return <div>Error loading guests: {error}</div>;

  // Calcular el número total de páginas
  const totalPages = Math.ceil(rooms.length / itemsPerPage);

  return (
    <div style={{ padding: "20px" }}>
      {/* Componente de la tabla */}
      <Table cols={cols} data={data} basePath={"room"} />

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

export default Rooms;
