import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchGuestById } from "../../redux/features/guests/guestsSlice.js";
import { fetchRoomById } from "../../redux/features/rooms/roomsSlice.ts";

import CallButton from "../../components/buttons/CallButon.js";
import SendMessageButton from "../../components/buttons/SendMessageButton.tsx";
import FacilitiesButton from "../../components/buttons/FacilitiesButton.tsx";
import Image from "../../components/Image.tsx";
import { RootState, AppDispatch } from "../../redux/store/store.ts";
import { useTranslation } from "react-i18next";
import { formatDateTimeDisplay } from "../../utils/dateUtils";

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const {
    guest: user,
    loading,
    error,
  } = useSelector((state: RootState) => state.guest);

  const room = useSelector((state: RootState) => state.room.room);

  useEffect(() => {
    if (id) {
      dispatch(fetchGuestById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (user?.roomNumber) {
      dispatch(fetchRoomById(user.roomNumber));
    }
  }, [dispatch, user?.roomNumber]);

  if (loading)
    return <p style={{ color: "black" }}>{t("bookings_details_charging")}</p>;
  if (!user)
    return (
      <p style={{ color: "black" }}>
        {t("bookings_details_charging_user_not_found")}
      </p>
    );
  if (error) return <p style={{ color: "black" }}>Error: {error}</p>;

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
          <p style={{ fontSize: "20px", fontWeight: "600", color: "#135846" }}>
            {user.name}
          </p>
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
          <p style={{ color: "#888", marginBottom: "4px" }}>
            {t("kpi_check_in")}
          </p>
          <p>
            <strong style={{ color: "#135846" }}>
              {formatDateTimeDisplay(user.checkIn)}
            </strong>
          </p>
        </div>
        <div>
          <p style={{ color: "#888", marginBottom: "4px" }}>
            {t("kpi_check_out")}
          </p>
          <p>
            <strong style={{ color: "#135846" }}>
              {formatDateTimeDisplay(user.checkOut)}
            </strong>
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
            <p style={{ color: "#888", marginBottom: "4px" }}>
              {t("user_detail.room_info")}
            </p>
            <p>
              <strong style={{ color: "#135846" }}>{user.roomType}</strong>
            </p>
          </div>
          <div>
            <p style={{ color: "#888", marginBottom: "4px" }}>
              {t("user_detail.price")}
            </p>
            <p>
              <strong style={{ color: "#135846" }}>
                ${room?.price}/{t("user_detail.price_night")}
              </strong>
            </p>
          </div>
        </div>

        {/* Notes */}
        <p>
          <strong style={{ color: "#135846" }}>
            {user.specialRequest.status
              ? user.specialRequest.text
              : t("user_detail.no_special_request")}
          </strong>
        </p>
        <br />
        <p>
          <strong style={{ color: "#135846" }}>
            {t("rooms_table_room_facilities")}
          </strong>
        </p>
        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
          <FacilitiesButton facilities={room?.amenities || []} />
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
