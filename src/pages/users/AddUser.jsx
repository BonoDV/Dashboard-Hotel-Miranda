import React, { useState } from "react";

const AddUser = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    image: "",
    orderDate: "",
    checkIn: { date: "", hour: "" },
    checkOut: { date: "", hour: "" },
    specialRequest: { status: false, text: "" },
    roomType: "",
    status: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("checkIn.") || name.startsWith("checkOut.")) {
      const [section, key] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [key]: value },
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
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    console.log("Submitted:", formData);
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
        name="id"
        placeholder="ID"
        value={formData.id}
        onChange={handleChange}
      />
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
      <input
        name="orderDate"
        placeholder="Order Date"
        value={formData.orderDate}
        onChange={handleChange}
      />

      <label>
        Check In Date:
        <input
          name="checkIn.date"
          value={formData.checkIn.date}
          onChange={handleChange}
        />
      </label>
      <label>
        Check In Hour:
        <input
          name="checkIn.hour"
          value={formData.checkIn.hour}
          onChange={handleChange}
        />
      </label>

      <label>
        Check Out Date:
        <input
          name="checkOut.date"
          value={formData.checkOut.date}
          onChange={handleChange}
        />
      </label>
      <label>
        Check Out Hour:
        <input
          name="checkOut.hour"
          value={formData.checkOut.hour}
          onChange={handleChange}
        />
      </label>

      <label>
        Special Request Status:
        <input
          type="checkbox"
          name="specialRequest.status"
          checked={formData.specialRequest.status}
          onChange={handleChange}
        />
      </label>
      <input
        name="specialRequest.text"
        placeholder="Special Request Text"
        value={formData.specialRequest.text}
        onChange={handleChange}
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

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddUser;
