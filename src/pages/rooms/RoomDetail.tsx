import { useParams } from "react-router";
import { useEffect } from "react";
import {
  fetchGuestById,
  fetchGuests,
} from "../../redux/features/guests/guestsSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import CallButton from "../../components/buttons/CallButon.js";
import SendMessageButton from "../../components/buttons/SendMessageButton.tsx";
import FacilitiesButton from "../../components/buttons/FacilitiesButton.tsx";
import Image from "../../components/Image.tsx";
import { fetchRoomById } from "../../redux/features/rooms/roomsSlice.ts";
import { RootState, AppDispatch } from "../../redux/store/store.ts";
import { useTranslation } from "react-i18next";

const RoomDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const { room, loading, error } = useSelector(
    (state: RootState) => state.room
  );

  const { guests } = useSelector((state: RootState) => state.guest);
  const matchingGuest = room
    ? guests.find(
        (guest) => guest.roomNumber.toString() === room.roomNumber.toString()
      )
    : undefined;

  useEffect(() => {
    if (id) {
      dispatch(fetchRoomById(Number(id)));
      dispatch(fetchGuests());
    }
  }, [dispatch, id]);

  if (loading)
    return <p style={{ color: "black" }}>{t("room_detail.loading")}</p>;
  if (error)
    return (
      <p style={{ color: "black" }}>{t("room_detail.error", { error })}</p>
    );
  if (!room)
    return <p style={{ color: "black" }}>{t("room_detail.not_found")}</p>;

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
          alt={t("room_detail.room_image_alt")}
          style={{ width: "156px", height: "156px", borderRadius: "12px" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "20px", fontWeight: "600", color: "#135846" }}>
            {t("room_detail.room_number", { number: room.roomNumber })}
          </p>
          <p style={{ color: "#888" }}>{room.roomType}</p>
          <p style={{ color: "#888" }}>
            {t("room_detail.bed_floor", {
              bedType: room.bedType,
              floor: room.roomFloor,
            })}
          </p>
        </div>
      </div>

      {/* Descripción */}
      <div style={{ marginTop: "24px" }}>
        <p style={{ fontWeight: "bold", color: "#135846" }}>
          {t("room_detail.description")}
        </p>
        <p style={{ color: "#888" }}>{room.description}</p>
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
          <p style={{ color: "#888", marginBottom: "4px" }}>
            {t("room_detail.price")}
          </p>
          <p>
            <strong style={{ color: "#135846" }}>
              {t("room_detail.price_value", { price: room.price })}
            </strong>
          </p>
        </div>
        <div>
          <p style={{ color: "#888", marginBottom: "4px" }}>
            {t("room_detail.discount")}
          </p>
          <p>
            <strong style={{ color: "#135846" }}>{room.discount}%</strong>
          </p>
        </div>
        <div>
          <p style={{ color: "#888", marginBottom: "4px" }}>
            {t("room_detail.cancellation")}
          </p>
          <p>
            <strong style={{ color: "#135846" }}>{room.cancellation}</strong>
          </p>
        </div>
      </div>

      {/* Oferta */}
      <div style={{ marginTop: "24px" }}>
        <p>
          <strong style={{ color: "#135846" }}>
            {t("room_detail.status")}{" "}
            {matchingGuest &&
            matchingGuest.status &&
            (matchingGuest.status.toLowerCase() === "pending" ||
              matchingGuest.status.toLowerCase() === "booked")
              ? t("room_detail.booked")
              : t("room_detail.available")}
          </strong>
        </p>
      </div>
      <br />

      {/* Amenities */}
      <div style={{ marginTop: "24px" }}>
        <p>
          <strong style={{ color: "#135846" }}>
            {t("room_detail.facilities")}
          </strong>
        </p>
        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
          <FacilitiesButton facilities={room.amenities} />
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
