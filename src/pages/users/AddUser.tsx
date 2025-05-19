import React, { useState } from "react";

interface FormData {
  id: string;
  name: string;
  image: string;
  orderDate: string;
  checkIn: Date;
  checkOut: Date;
  specialRequest: { status: boolean; text: string };
  roomType: string;
  status: string;
  phone: string;
  email: string;
}

interface AddUserProps {
  onSubmit: (data: FormData) => void;
}

const AddUser: React.FC<AddUserProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    id: "",
    name: "",
    image: "",
    orderDate: "",
    checkIn: new Date(),
    checkOut: new Date(),
    specialRequest: { status: false, text: "" },
    roomType: "",
    status: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("checkIn.") || name.startsWith("checkOut.")) {
      const [section, key] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section as "checkIn" | "checkOut"],
          [key]: value,
        },
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
          value={formData.checkIn.toString()}
          onChange={handleChange}
        />
      </label>
      <label>
        Check In Hour:
        <input
          name="checkIn.hour"
          value={formData.checkIn.toString()}
          onChange={handleChange}
        />
      </label>

      <label>
        Check Out Date:
        <input
          name="checkOut.date"
          value={formData.checkOut.toString()}
          onChange={handleChange}
        />
      </label>
      <label>
        Check Out Hour:
        <input
          name="checkOut.hour"
          value={formData.checkOut.toString()}
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
