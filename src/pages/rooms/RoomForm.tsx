import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import FacilitiesButton from "../../components/buttons/FacilitiesButton.tsx";
import {
  fetchRoomById,
  updateRoom,
} from "../../redux/features/rooms/roomsSlice.ts";
import { RootState, AppDispatch } from "../../redux/store/store.ts";
import { number } from "prop-types";
import styled from "styled-components";

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
  const { t } = useTranslation();

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

  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );

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

  if (loading)
    return <div style={{ color: "black" }}>{t("room_form_loading")}</div>;
  if (error)
    return (
      <div style={{ color: "black" }}>
        {t("room_form_error")}
        {error}
      </div>
    );
  if (!selectedRoom)
    return <div style={{ color: "black" }}>{t("room_form_not_found")}</div>;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "roomNumber" || name === "price" || name === "discount"
          ? Number(value)
          : value,
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

    if (
      !formData.roomNumber ||
      !formData.roomType ||
      !formData.bedType ||
      !formData.roomFloor ||
      !formData.price ||
      formData.discount === null ||
      !formData.offer ||
      !formData.cancellation ||
      !formData.description ||
      formData.photos.length === 0 ||
      formData.amenities.length === 0
    ) {
      // Console.log all the if conditions that are not met
      if (!formData.roomNumber) console.log("Room number is required");
      if (!formData.roomType) console.log("Room type is required");
      if (!formData.bedType) console.log("Bed type is required");
      if (!formData.roomFloor) console.log("Room floor is required");
      if (!formData.price) console.log("Price is required");
      if (!formData.discount) console.log("Discount is required");
      if (!formData.offer) console.log("Offer is required");
      if (!formData.cancellation)
        console.log("Cancellation policy is required");
      if (!formData.description) console.log("Description is required");
      if (formData.photos.length === 0)
        console.log("At least one photo is required");
      if (formData.amenities.length === 0)
        console.log("At least one amenity is required");

      console.log(formData);
      setSubmitStatus("error");
      return;
    }

    const dataToSend = {
      ...formData,
    };
    dispatch(updateRoom(dataToSend));
    setSubmitStatus("success");
    console.log("Submitted:", dataToSend);
  };

  return (
    <CardForm onSubmit={handleSubmit}>
      <TwoColGrid>
        <Field>
          <FieldTitle>{t("room_form_room_number")}</FieldTitle>
          <TextInput
            name="roomNumber"
            type="number"
            placeholder={t("room_form_room_number_placeholder")}
            value={formData.roomNumber}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <FieldTitle>{t("room_form_room_type")}</FieldTitle>
          <TextInput
            name="roomType"
            placeholder={t("room_form_room_type_placeholder")}
            value={formData.roomType}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <FieldTitle>{t("room_form_bed_type")}</FieldTitle>
          <TextInput
            name="bedType"
            placeholder={t("room_form_bed_type_placeholder")}
            value={formData.bedType}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <FieldTitle>{t("room_form_floor")}</FieldTitle>
          <TextInput
            name="roomFloor"
            placeholder={t("room_form_floor_placeholder")}
            value={formData.roomFloor}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <FieldTitle>{t("room_form_price")}</FieldTitle>
          <TextInput
            name="price"
            type="number"
            placeholder={t("room_form_price_placeholder")}
            value={formData.price}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <FieldTitle>{t("room_form_discount")}</FieldTitle>
          <TextInput
            name="discount"
            type="number"
            placeholder={t("room_form_discount_placeholder")}
            value={formData.discount}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <FieldTitle>{t("room_form_offer")}</FieldTitle>
          <TextInput
            name="offer"
            placeholder={t("room_form_offer_placeholder")}
            value={formData.offer}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <FieldTitle>{t("room_form_cancellation")}</FieldTitle>
          <TextInput
            name="cancellation"
            placeholder={t("room_form_cancellation_placeholder")}
            value={formData.cancellation}
            onChange={handleChange}
          />
        </Field>
      </TwoColGrid>

      <Field>
        <FieldTitle>{t("room_form_description")}</FieldTitle>
        <TextArea
          name="description"
          placeholder={t("room_form_description_placeholder")}
          value={formData.description}
          onChange={handleChange}
        />
      </Field>

      <Field>
        <FieldTitle>{t("room_form_photos")}</FieldTitle>
        {formData.photos.map((photo, index) => (
          <ArrayItemContainer key={index}>
            <TextInput
              type="text"
              value={photo}
              onChange={(e) => handleArrayChange(e, "photos", index)}
              placeholder={`${t("room_form_photo_url")}${index + 1}`}
            />
            <RemoveButton
              type="button"
              onClick={() => removeArrayItem("photos", index)}
            >
              {t("room_form_remove")}
            </RemoveButton>
          </ArrayItemContainer>
        ))}
        <AddButton type="button" onClick={() => addArrayItem("photos")}>
          {t("room_form_add_photo")}
        </AddButton>
      </Field>

      <Field>
        <FieldTitle>{t("room_form_amenities")}</FieldTitle>
        {formData.amenities.map((amenity, index) => (
          <ArrayItemContainer key={index}>
            <TextInput
              type="text"
              value={amenity}
              onChange={(e) => handleArrayChange(e, "amenities", index)}
              placeholder={`${t("room_form_amenity")}${index + 1}`}
            />
            <RemoveButton
              type="button"
              onClick={() => removeArrayItem("amenities", index)}
            >
              {t("room_form_remove")}
            </RemoveButton>
          </ArrayItemContainer>
        ))}
        <AddButton type="button" onClick={() => addArrayItem("amenities")}>
          {t("room_form_add_amenity")}
        </AddButton>
      </Field>

      <FacilitiesContainer>
        <FacilitiesButton facilities={formData.amenities} />
      </FacilitiesContainer>

      <SubmitButton type="submit">{t("room_form_save_room")}</SubmitButton>
      {submitStatus === "success" && (
        <Alert $type="success">{t("room_updated_successfully")}</Alert>
      )}
      {submitStatus === "error" && (
        <Alert $type="error">{t("please_fill_required_fields")}</Alert>
      )}
    </CardForm>
  );
};

const CardForm = styled.form`
  display: grid;
  gap: 16px;
  max-width: 90%;
  height: 95%;
  margin: 0 auto;
  padding: 24px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: saturate(180%) blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
`;

const TwoColGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
  font-weight: 500;
`;

const FieldTitle = styled.span`
  color: #212121;
  font-size: 14px;
`;

const TextInput = styled.input`
  appearance: none;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #212121;
  padding: 12px 14px;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  appearance: none;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #212121;
  padding: 12px 14px;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  min-height: 100px;
  resize: vertical;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ArrayItemContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const RemoveButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ef4444;
  background: #ffffff;
  color: #dc2626;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #fee2e2;
    border-color: #dc2626;
  }
`;

const AddButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #10b981;
  background: #ffffff;
  color: #059669;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;

  &:hover {
    background: #dcfce7;
    border-color: #059669;
  }
`;

const FacilitiesContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const SubmitButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: none;
  padding: 12px 16px;
  border-radius: 12px;
  background: linear-gradient(135deg, #23a482, #135846);
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.08s ease, box-shadow 0.2s ease, filter 0.2s ease;
  max-height: 40px;

  &:hover {
    box-shadow: 0 10px 20px rgba(99, 102, 241, 0.25);
    filter: brightness(1.02);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const Alert = styled.div<{ $type: "success" | "error" }>`
  padding: 12px 14px;
  border-radius: 12px;
  font-weight: 600;
  text-align: left;
  color: ${({ $type }) => ($type === "success" ? "#065f46" : "#991b1b")};
  background: ${({ $type }) => ($type === "success" ? "#d1fae5" : "#fee2e2")};
  border: 1px solid
    ${({ $type }) => ($type === "success" ? "#a7f3d0" : "#fecaca")};

  @media (prefers-color-scheme: dark) {
    color: ${({ $type }) => ($type === "success" ? "#bbf7d0" : "#fecaca")};
    background: ${({ $type }) => ($type === "success" ? "#064e3b" : "#7f1d1d")};
    border-color: ${({ $type }) =>
      $type === "success" ? "#065f46" : "#991b1b"};
  }
`;

export default RoomForm;
