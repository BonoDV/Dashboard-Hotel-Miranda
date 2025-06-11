import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  fetchGuestById,
  updateGuest,
} from "../../redux/features/guests/guestsSlice";
import { RootState, AppDispatch } from "../../redux/store/store";

type BookingFormData = {
  id: string;
  name: string;
  image: string;
  orderDate: Date | null;
  checkIn: Date | null;
  checkOut: Date | null;
  specialRequest: {
    status: boolean;
    text: string;
  };
  roomType: string;
  status: string;
  phone: string;
  email: string;
  roomNumber: number;
};

const EditBooking: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const {
    guest: user,
    loading,
    error,
  } = useSelector((state: RootState) => state.guest);

  const [formData, setFormData] = useState<BookingFormData>({
    id: "",
    name: "",
    image: "",
    orderDate: null,
    checkIn: null,
    checkOut: null,
    specialRequest: { status: false, text: "" },
    roomType: "",
    status: "",
    phone: "",
    email: "",
    roomNumber: 0,
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchGuestById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (user && id) {
      setFormData({
        id: id || "",
        name: user.name || "",
        image: user.image || "",
        orderDate: user.orderDate ? new Date(user.orderDate) : null,
        checkIn: user.checkIn ? new Date(user.checkIn) : null,
        checkOut: user.checkOut ? new Date(user.checkOut) : null,
        specialRequest: {
          status: user.specialRequest?.status || false,
          text: user.specialRequest?.text || "",
        },
        roomType: user.roomType || "",
        status: user.status || "",
        phone: user.phone || "",
        email: user.email || "",
        roomNumber: user.roomNumber || 0,
      });
    }
  }, [user, id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    if (name === "roomNumber") {
      setFormData((prev) => ({ ...prev, roomNumber: Number(value) }));
    } else if (name === "specialRequest.status") {
      setFormData((prev) => ({
        ...prev,
        specialRequest: { ...prev.specialRequest, status: checked },
      }));
    } else if (name === "specialRequest.text") {
      setFormData((prev) => ({
        ...prev,
        specialRequest: { ...prev.specialRequest, text: value },
      }));
    } else if (
      name === "orderDate" ||
      name === "checkIn" ||
      name === "checkOut"
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: value ? new Date(value) : null,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      specialRequest: {
        ...formData.specialRequest,
        text: formData.specialRequest.status
          ? formData.specialRequest.text
          : "",
      },
    };
    dispatch(updateGuest(dataToSend));
    console.log("Submitted:", dataToSend);
  };

  // Only return JSX after all hooks have been called
  if (loading) return <p>Cargando datos de la reserva...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user && !loading) return <p>Reserva no encontrada.</p>;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "500px",
      }}
    >
      <input
        name="name"
        placeholder="user Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />
      <input
        name="orderDate"
        type="date"
        placeholder="Order Date"
        value={
          formData.orderDate
            ? formData.orderDate.toISOString().slice(0, 10)
            : ""
        }
        onChange={handleChange}
      />
      <input
        name="checkIn"
        type="date"
        placeholder="Check In"
        value={
          formData.checkIn ? formData.checkIn.toISOString().slice(0, 10) : ""
        }
        onChange={handleChange}
      />
      <input
        name="checkOut"
        type="date"
        placeholder="Check Out"
        value={
          formData.checkOut ? formData.checkOut.toISOString().slice(0, 10) : ""
        }
        onChange={handleChange}
      />
      <label>
        Special Request:
        <input
          type="checkbox"
          name="specialRequest.status"
          checked={formData.specialRequest.status}
          onChange={handleChange}
        />
      </label>
      <textarea
        name="specialRequest.text"
        placeholder="Special Request Text"
        value={formData.specialRequest.text}
        onChange={handleChange}
        disabled={!formData.specialRequest.status}
      />
      <input
        name="roomType"
        placeholder="Room Type"
        value={formData.roomType}
        onChange={handleChange}
      />
      <input
        name="status"
        placeholder="Booking Status"
        value={formData.status}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="roomNumber"
        type="number"
        placeholder="Room Number"
        value={formData.roomNumber}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditBooking;
