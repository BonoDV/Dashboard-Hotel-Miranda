import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import FacilitiesButton from "../../components/buttons/FacilitiesButton.tsx";
import { fetchRoomById } from "../../redux/features/rooms/roomsSlice.ts";
import { RootState, AppDispatch } from "../../redux/store/store.ts";
import { number } from "prop-types";

type RoomFormProps = {
  onSubmit?: (formData: RoomFormData) => void;
};

type RoomFormData = {
  roomNumber: number;
  roomType: string;
  bedType: string;
  roomFloor: string;
  photos: string[];
  description: string;
  offer: string;
  price: number;
  discount: number;
  cancellation: string;
  amenities: string[];
};

const RoomForm: React.FC<RoomFormProps> = ({ onSubmit }) => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const {
    room: selectedRoom,
    loading,
    error,
  } = useSelector((state: RootState) => state.room);

  const [formData, setFormData] = useState<RoomFormData>({
    roomNumber: 0,
    roomType: "",
    bedType: "",
    roomFloor: "",
    photos: [""],
    description: "",
    offer: "",
    price: 0,
    discount: 0,
    cancellation: "",
    amenities: [""],
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchRoomById(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedRoom) {
      setFormData({
        roomNumber: selectedRoom.roomNumber || 0,
        roomType: selectedRoom.roomType || "",
        bedType: selectedRoom.bedType || "",
        roomFloor: selectedRoom.roomFloor || "",
        photos: selectedRoom.photos?.length ? selectedRoom.photos : [""],
        description: selectedRoom.description || "",
        offer: selectedRoom.offer || "",
        price: selectedRoom.price,
        discount: selectedRoom.discount,
        cancellation: selectedRoom.cancellation || "",
        amenities: selectedRoom.amenities?.length
          ? selectedRoom.amenities
          : [""],
      });
    }
  }, [selectedRoom]);

  if (loading) return <p>Cargando datos de la habitación...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!selectedRoom) return <p>Habitación no encontrada.</p>;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "roomNumber" ? Number(value) : value,
    }));
  };

  const handleArrayChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof RoomFormData,
    index: number
  ) => {
    const newArray = [...(formData[field] as string[])];
    newArray[index] = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };

  const addArrayItem = (field: keyof RoomFormData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""],
    }));
  };

  const removeArrayItem = (field: keyof RoomFormData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
        name="roomNumber"
        type="number"
        placeholder="Room Number"
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

      <label>Photos:</label>
      {formData.photos.map((photo, index) => (
        <div key={index}>
          <input
            type="text"
            value={photo}
            onChange={(e) => handleArrayChange(e, "photos", index)}
            placeholder={`Photo URL #${index + 1}`}
          />
          <button
            type="button"
            onClick={() => removeArrayItem("photos", index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem("photos")}>
        Add Photo
      </button>

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        name="offer"
        placeholder="Offer"
        value={formData.offer}
        onChange={handleChange}
      />
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

      <label>Amenities:</label>
      {formData.amenities.map((amenity, index) => (
        <div key={index}>
          <input
            type="text"
            value={amenity}
            onChange={(e) => handleArrayChange(e, "amenities", index)}
            placeholder={`Amenity #${index + 1}`}
          />
          <button
            type="button"
            onClick={() => removeArrayItem("amenities", index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem("amenities")}>
        Add Amenity
      </button>

      <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
        <FacilitiesButton facilities={formData.amenities} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default RoomForm;
