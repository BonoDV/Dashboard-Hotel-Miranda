import { useParams } from "react-router";
import GuestsList from "./../../../public/data/guests.json";
import RoomList from "./../../../public/data/rooms.json";

import CallButton from "./../../components/buttons/CallButon.jsx";
import SendMessageButton from "./../../components/buttons/SendMessageButton.tsx";
import FacilitiesButton from "./../../components/buttons/FacilitiesButton.tsx";
import Image from "./../../components/Image.jsx";

const RoomDetail = () => {
  const { id } = useParams();
  const user = GuestsList.find((u) => u.id === id);
  const room = RoomList.find((r) => r.roomType === user.roomType);
  if (!room) {
    return <p>Habitación no encontrada.</p>;
  }

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "13px 3px 40px var(--shadows)",
      }}
    >
      {/* Encabezado: Imagen + Info básica */}
      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        {/* Imagen del usuario */}
        <Image
          src={user.image}
          alt="Guest"
          style={{ width: "156px", height: "156px", borderRadius: "12px" }}
        />

        {/* Info a la derecha de la imagen */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Nombre e ID */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: "20px", fontWeight: "600" }}>{user.name}</p>
            <p style={{ color: "#888" }}>ID #{user.id}</p>
          </div>

          {/* Botones */}
          <div style={{ display: "flex", gap: "12px" }}>
            <CallButton phone={user.phone} />
            <SendMessageButton email={user.email} />
          </div>
        </div>
      </div>

      {/* Check In / Check Out */}
      <div
        style={{
          display: "flex",
          gap: "125px",
          marginTop: "32px",
          paddingBottom: "16px",
          borderBottom: "1px solid #E5E5E5",
        }}
      >
        <div>
          <p style={{ color: "#888", marginBottom: "4px" }}>Check In</p>
          <p>
            <strong>
              {user.checkIn.date} | {user.checkIn.hour}
            </strong>
          </p>
        </div>
        <div>
          <p style={{ color: "#888", marginBottom: "4px" }}>Check Out</p>
          <p>
            <strong>
              {user.checkOut.date} | {user.checkOut.hour}
            </strong>
          </p>
        </div>
      </div>

      {/* Resto de la información */}
      <div style={{ marginTop: "24px" }}>
        {/* Room Info / Price */}
        <div
          style={{
            display: "flex",
            gap: "155px",
            marginTop: "32px",
            paddingBottom: "16px",
            borderBottom: "1px solid #E5E5E5",
          }}
        >
          <div>
            <p style={{ color: "#888", marginBottom: "4px" }}>Room Info</p>
            <p>
              <strong>{user.roomType}</strong>
            </p>
          </div>
          <div>
            <p style={{ color: "#888", marginBottom: "4px" }}>Price</p>
            <p>
              <strong>${room.price}/night</strong>
            </p>
          </div>
        </div>
        {/* Notes */}
        <p>
          <strong>
            {user.specialRequest.status
              ? user.specialRequest.text
              : "No Special Request"}
          </strong>
        </p>

        <p>
          <strong>Facilities</strong>
        </p>
        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
          <FacilitiesButton facilities={room.amenities} />
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
