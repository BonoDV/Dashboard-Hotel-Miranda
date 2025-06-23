import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store"; // Adjust path if needed
import { createRoom } from "../../redux/features/rooms/roomsSlice";

interface FormData {
  roomNumber: number;
  roomType: string;
  bedType: string;
  roomFloor: string;
  photos: string[]; // URLs de imágenes
  description: string;
  offer: "YES" | "NO";
  price: number;
  discount: number; // Porcentaje
  cancellation: string;
  amenities: string[];
}

const AddRoom: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<FormData>({
    roomNumber: 0,
    roomType: "",
    bedType: "",
    roomFloor: "",
    photos: [], // URLs de imágenes
    description: "",
    offer: "NO",
    price: 0,
    discount: 0, // Porcentaje
    cancellation: "",
    amenities: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      let newValue: any = value;

      // Convertir a número si corresponde
      if (["roomNumber", "price", "discount"].includes(name)) {
        newValue = Number(value);
      }

      // Convertir campos de texto separados por comas a arrays
      if (["photos", "amenities"].includes(name)) {
        newValue = value.split(",").map((item) => item.trim());
      }

      return {
        ...prev,
        [name]: newValue,
      };
    });
  };
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation example: all required fields must be filled
    if (
      !formData.roomNumber ||
      !formData.roomType ||
      !formData.bedType ||
      !formData.roomFloor ||
      !formData.photos ||
      !formData.description ||
      !formData.offer ||
      !formData.price ||
      !formData.discount ||
      !formData.cancellation ||
      !formData.amenities
    ) {
      setSubmitStatus("error");
      return;
    }

    // Generate a unique id for the new guest
    const newRoom = { ...formData };
    dispatch(createRoom(newRoom));
    setSubmitStatus("success");
    console.log("Submitted:", newRoom);
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
        name="roomNumber"
        placeholder="Room Number"
        type="number"
        value={formData.roomNumber}
        onChange={handleChange}
      />
      <input
        name="roomType"
        placeholder="Room Type"
        value={formData.roomType}
        onChange={handleChange}
      />
      <input
        name="bedType"
        placeholder="Bed Type"
        value={formData.bedType}
        onChange={handleChange}
      />
      <input
        name="roomFloor"
        placeholder="Room Floor"
        value={formData.roomFloor}
        onChange={handleChange}
      />
      <input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <select name="offer" value={formData.offer} onChange={handleChange}>
        <option value="YES">YES</option>
        <option value="NO">NO</option>
      </select>
      <input
        name="price"
        placeholder="Price"
        type="number"
        value={formData.price}
        onChange={handleChange}
      />
      <input
        name="discount"
        placeholder="Discount (%)"
        type="number"
        value={formData.discount}
        onChange={handleChange}
      />
      <input
        name="cancellation"
        placeholder="Cancellation Policy"
        value={formData.cancellation}
        onChange={handleChange}
      />
      <input
        name="photos"
        placeholder="Photo URLs (comma separated)"
        value={formData.photos.join(",")}
        onChange={handleChange}
      />

      <input
        name="amenities"
        placeholder="Amenities (comma separated)"
        value={formData.amenities.join(",")}
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

export default AddRoom;
