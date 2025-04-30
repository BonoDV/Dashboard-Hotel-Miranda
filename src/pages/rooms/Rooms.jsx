import RoomsList from "../rooms/rooms.json";
import Table from "./../../components/Table.jsx";
import Image from "./../../components/Image.jsx";
function Rooms() {
  const cols = [
    "Room Name",
    "Bed Type",
    "Room Floor",
    "Facilities",
    "Rate",
    "Status",
  ];

  // Mapeamos los datos de ConciergeList
  const data = RoomsList.map((res) => ({
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

  return (
    <div style={{ padding: "20px" }}>
      {/* Componente de la tabla */}
      <Table cols={cols} data={data} basePath={"room"} />
    </div>
  );
}

export default Rooms;
