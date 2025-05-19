import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchGuestById } from "../../redux/features/guests/guestsSlice.js"; // Ajusta la ruta según tu estructura
import RoomList from "../../../public/data/rooms.json";

import CallButton from "../../components/buttons/CallButon.js";
import SendMessageButton from "../../components/buttons/SendMessageButton.tsx";
import FacilitiesButton from "../../components/buttons/FacilitiesButton.tsx";
import Image from "../../components/Image.tsx";
import { RootState, AppDispatch } from "../../redux/store/store.ts";

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const {
    guest: user,
    loading,
    error,
  } = useSelector((state: RootState) => state.guest);

  const room = user ? RoomList.find((r) => r.roomType === user.roomType) : null;

  useEffect(() => {
    if (id) {
      dispatch(fetchGuestById(id));
    }
  }, [dispatch, id]);

  if (loading) return <p>Cargando datos del usuario...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Usuario no encontrado.</p>;

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
        <Image
          src={user.image}
          alt="Guest"
          style={{ width: "156px", height: "156px", borderRadius: "12px" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "20px", fontWeight: "600" }}>{user.name}</p>
          <p style={{ color: "#888" }}>ID #{user.id}</p>
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
            <strong>{user.checkIn.toString()}</strong>
          </p>
        </div>
        <div>
          <p style={{ color: "#888", marginBottom: "4px" }}>Check Out</p>
          <p>
            <strong>{user.checkOut.toString()}</strong>
          </p>
        </div>
      </div>

      {/* Resto de la información */}
      <div style={{ marginTop: "24px" }}>
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
              <strong>${room?.price}/night</strong>
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
          <FacilitiesButton facilities={room?.amenities || []} />
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
