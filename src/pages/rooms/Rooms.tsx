import { useEffect } from "react";

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

  // Mapeamos los datos de ConciergeList
  const data = rooms.map((res) => ({
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

  return (
    <div style={{ padding: "20px" }}>
      {/* Componente de la tabla */}
      <Table cols={cols} data={data} basePath={"room"} />
    </div>
  );
}

export default Rooms;
