import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store"; // Adjust path if needed
import { createRoom } from "../../redux/features/rooms/roomsSlice";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

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
            placeholder={t("room_form_price_placeholder")}
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <FieldTitle>{t("room_form_discount")}</FieldTitle>
          <TextInput
            name="discount"
            placeholder={t("room_form_discount_placeholder")}
            type="number"
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
        <TextInput
          name="photos"
          placeholder={t("room_form_photos_hint")}
          value={formData.photos.join(",")}
          onChange={handleChange}
        />
      </Field>

      <Field>
        <FieldTitle>{t("room_form_amenities")}</FieldTitle>
        <TextInput
          name="amenities"
          placeholder={t("room_form_amenities_hint")}
          value={formData.amenities.join(",")}
          onChange={handleChange}
        />
      </Field>

      <FacilitiesContainer>
        {/* keep simple facilities preview if needed */}
      </FacilitiesContainer>

      <SubmitButton type="submit">{t("room_form_save_room")}</SubmitButton>
      {submitStatus === "success" && (
        <Alert $type="success">{t("room_created_successfully")}</Alert>
      )}
      {submitStatus === "error" && (
        <Alert $type="error">{t("please_fill_required_fields")}</Alert>
      )}
    </CardForm>
  );
};

// styled components copied from RoomForm.tsx to match styles
const CardForm = styled.form`
  display: grid;
  gap: 16px;
  max-width: 90%;
  height: 90%;
  margin: 0 auto;
  padding: 24px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: saturate(180%) blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  @media (prefers-color-scheme: dark) {
    background: rgba(20, 20, 20, 0.75);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }
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
  color: #374151;
  font-size: 14px;

  @media (prefers-color-scheme: dark) {
    color: #e5e7eb;
  }
`;

const TextInput = styled.input`
  appearance: none;
  border: 1px solid #e5e7eb;
  background: #fafafa;
  color: #111827;
  padding: 12px 14px;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
    background: #ffffff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (prefers-color-scheme: dark) {
    border-color: #374151;
    background: #111827;
    color: #f9fafb;

    &:focus {
      border-color: #818cf8;
      box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.2);
      background: #0b0f1a;
    }
  }
`;

const TextArea = styled.textarea`
  appearance: none;
  border: 1px solid #e5e7eb;
  background: #fafafa;
  color: #111827;
  padding: 12px 14px;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  min-height: 100px;
  resize: vertical;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
    background: #ffffff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (prefers-color-scheme: dark) {
    border-color: #374151;
    background: #111827;
    color: #f9fafb;

    &:focus {
      border-color: #818cf8;
      box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.2);
      background: #0b0f1a;
    }
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
  background: #fef2f2;
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

  @media (prefers-color-scheme: dark) {
    border-color: #7f1d1d;
    background: #1f1f1f;
    color: #fca5a5;

    &:hover {
      background: #7f1d1d;
      border-color: #991b1b;
    }
  }
`;

const AddButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #10b981;
  background: #f0fdf4;
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

  @media (prefers-color-scheme: dark) {
    border-color: #065f46;
    background: #1f1f1f;
    color: #6ee7b7;

    &:hover {
      background: #064e3b;
      border-color: #047857;
    }
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

export default AddRoom;
