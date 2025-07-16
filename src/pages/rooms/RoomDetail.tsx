import { useParams } from "react-router";
import { useEffect } from "react";
import { fetchGuestById } from "../../redux/features/guests/guestsSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import CallButton from "../../components/buttons/CallButon.js";
import SendMessageButton from "../../components/buttons/SendMessageButton.tsx";
import FacilitiesButton from "../../components/buttons/FacilitiesButton.tsx";
import Image from "../../components/Image.tsx";
import { fetchRoomById } from "../../redux/features/rooms/roomsSlice.ts";
import { RootState, AppDispatch } from "../../redux/store/store.ts";

const RoomDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { room, loading, error } = useSelector(
    (state: RootState) => state.room
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchRoomById(Number(id)));
    }
  }, [dispatch, id]);

  if (loading) return <p>Cargando datos del usuario...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!room) return <p>Habitación no encontrado.</p>;

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
          src={room.photos[0]}
          alt="Room"
          style={{ width: "156px", height: "156px", borderRadius: "12px" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "20px", fontWeight: "600" }}>
            Room #{room.roomNumber}
          </p>
          <p style={{ color: "#888" }}>{room.roomType}</p>
          <p>
            {room.bedType} bed • Floor {room.roomFloor}
          </p>
        </div>
      </div>

      {/* Descripción */}
      <div style={{ marginTop: "24px" }}>
        <p style={{ fontWeight: "bold" }}>Description</p>
        <p>{room.description}</p>
      </div>

      {/* Precio, descuento y cancelación */}
      <div
        style={{
          display: "flex",
          gap: "80px",
          marginTop: "32px",
          paddingBottom: "16px",
          borderBottom: "1px solid #E5E5E5",
        }}
      >
        <div>
          <p style={{ color: "#888", marginBottom: "4px" }}>Price</p>
          <p>
            <strong>${room.price}/night</strong>
          </p>
        </div>
        <div>
          <p style={{ color: "#888", marginBottom: "4px" }}>Discount</p>
          <p>
            <strong>{room.discount}%</strong>
          </p>
        </div>
        <div>
          <p style={{ color: "#888", marginBottom: "4px" }}>Cancellation</p>
          <p>
            <strong>{room.cancellation}</strong>
          </p>
        </div>
      </div>

      {/* Oferta */}
      <div style={{ marginTop: "24px" }}>
        <p>
          <strong>
            Offer: {room.offer === "YES" ? "Available" : "Not Available"}
          </strong>
        </p>
      </div>

      {/* Amenities */}
      <div style={{ marginTop: "24px" }}>
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
