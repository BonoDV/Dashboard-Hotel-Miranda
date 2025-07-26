import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store"; // Adjust path if needed
import { createGuest } from "../../redux/features/guests/guestsSlice";
import { formatDateForInput, parseInputDate } from "../../utils/dateUtils";

interface FormData {
  name: string;
  image: string;
  orderDate: string;
  checkIn: string;
  checkOut: string;
  specialRequest: { status: boolean; text: string };
  roomType: string;
  status: string;
  phone: string;
  email: string;
  roomNumber: string;
}

const AddBookings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    image: "",
    orderDate: "",
    checkIn: "",
    checkOut: "",
    specialRequest: { status: false, text: "" },
    roomType: "",
    status: "",
    phone: "",
    email: "",
    roomNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === "orderDate") {
      setFormData((prev) => ({
        ...prev,
        orderDate: parseInputDate(value) || "",
      }));
    } else if (name === "checkIn.date") {
      setFormData((prev) => ({
        ...prev,
        checkIn: parseInputDate(value) || "",
      }));
    } else if (name === "checkOut.date") {
      setFormData((prev) => ({
        ...prev,
        checkOut: parseInputDate(value) || "",
      }));
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
    } else {
      setFormData((prev) => ({
        ...prev,
        [name as keyof FormData]: value,
      }));
    }
  };

  const [specialRequestStatus, setSpecialRequestStatus] = useState(true);

  const handleSpecialRequestChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = e.target;
    setSpecialRequestStatus(checked);
    setFormData((prev) => ({
      ...prev,
      specialRequest: { ...prev.specialRequest, status: checked },
    }));
  };

  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation example: all required fields must be filled
    if (
      !formData.name ||
      !formData.email ||
      !formData.roomType ||
      !formData.status ||
      !formData.phone ||
      !formData.roomNumber
    ) {
      setSubmitStatus("error");
      return;
    }

    // Generate a unique id for the new guest
    const guestWithId = {
      ...formData,
      id: Date.now().toString(),
      orderDate: formatDateForInput(formData.orderDate),
      checkIn: formatDateForInput(formData.checkIn),
      checkOut: formatDateForInput(formData.checkOut),
    };
    dispatch(createGuest(guestWithId));
    setSubmitStatus("success");
    console.log("Submitted:", guestWithId);
  };

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
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />
      <label>
        Order Date:
        <input
          name="orderDate"
          placeholder="Order Date"
          value={formatDateForInput(formData.orderDate)}
          onChange={handleChange}
          type="datetime-local"
        />
      </label>
      <label>
        Check In Date:
        <input
          name="checkIn.date"
          value={formatDateForInput(formData.checkIn)}
          onChange={handleChange}
          type="datetime-local"
        />
      </label>

      <label>
        Check Out Date:
        <input
          name="checkOut.date"
          value={formatDateForInput(formData.checkOut)}
          onChange={handleChange}
          type="datetime-local"
        />
      </label>

      <label>
        Special Request Status:
        <input
          type="checkbox"
          name="specialRequest.status"
          checked={specialRequestStatus}
          onChange={handleSpecialRequestChange}
        />
      </label>
      <input
        name="specialRequest.text"
        placeholder="Special Request Text"
        value={formData.specialRequest.text}
        onChange={handleChange}
        disabled={!specialRequestStatus}
      />

      <input
        name="roomType"
        placeholder="Room Type"
        value={formData.roomType}
        onChange={handleChange}
      />
      <input
        name="status"
        placeholder="Status"
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
        placeholder="Room Number"
        value={formData.roomNumber}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
      {submitStatus === "success" && (
        <div style={{ color: "green" }}>Submitted successfully!</div>
      )}
      {submitStatus === "error" && (
        <div style={{ color: "red" }}>Please fill in all required fields.</div>
      )}
    </form>
  );
};

export default AddBookings;
