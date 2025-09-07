import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store"; // Adjust path if needed
import { createGuest } from "../../redux/features/guests/guestsSlice";
import { formatDateForInput, parseInputDate } from "../../utils/dateUtils";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface FormData {
  name: string;
  image: string;
  orderDate: Date | null;
  checkIn: Date | null;
  checkOut: Date | null;
  specialRequest: { status: boolean; text: string };
  roomType: string;
  status: string;
  phone: string;
  email: string;
  roomNumber: string;
}

const AddBookings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
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
    roomNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === "orderDate") {
      setFormData((prev) => ({
        ...prev,
        orderDate: parseInputDate(value) || null,
      }));
    } else if (name === "checkIn.date") {
      setFormData((prev) => ({
        ...prev,
        checkIn: parseInputDate(value) || null,
      }));
    } else if (name === "checkOut.date") {
      setFormData((prev) => ({
        ...prev,
        checkOut: parseInputDate(value) || null,
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
      orderDate: formData.orderDate ?? new Date(),
      checkIn: formData.checkIn ?? new Date(),
      checkOut: formData.checkOut ?? new Date(),
      roomNumber: Number(formData.roomNumber) || 0,
    };
    dispatch(createGuest(guestWithId));
    setSubmitStatus("success");
    console.log("Submitted:", guestWithId);
  };

  return (
    <CardForm onSubmit={handleSubmit}>
      <TwoColGrid>
        <Field>
          <FieldTitle>{t("bookings_add_form_name")}</FieldTitle>
          <TextInput
            name="name"
            placeholder={t("bookings_add_form_name")}
            value={formData.name}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <FieldTitle>{t("bookings_add_form_image")}</FieldTitle>
          <TextInput
            name="image"
            placeholder={t("bookings_add_form_image")}
            value={formData.image}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <FieldTitle>{t("bookings_add_form_order")}</FieldTitle>
          <TextInput
            name="orderDate"
            placeholder={t("bookings_add_form_order")}
            value={formatDateForInput(formData.orderDate)}
            onChange={handleChange}
            type="datetime-local"
          />
        </Field>

        <Field>
          <FieldTitle>{t("bookings_add_form_checkIn")}</FieldTitle>
          <TextInput
            name="checkIn.date"
            value={formatDateForInput(formData.checkIn)}
            onChange={handleChange}
            type="datetime-local"
          />
        </Field>

        <Field>
          <FieldTitle>{t("bookings_add_form_checkOut")}</FieldTitle>
          <TextInput
            name="checkOut.date"
            value={formatDateForInput(formData.checkOut)}
            onChange={handleChange}
            type="datetime-local"
          />
        </Field>

        <Field>
          <FieldTitle>{t("bookings_add_form_roomType")}</FieldTitle>
          <TextInput
            name="roomType"
            placeholder={t("bookings_add_form_roomType")}
            value={formData.roomType}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <FieldTitle>{t("bookings_add_form_status")}</FieldTitle>
          <TextInput
            name="status"
            placeholder={t("bookings_add_form_status")}
            value={formData.status}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <FieldTitle>{t("bookings_add_form_phone")}</FieldTitle>
          <TextInput
            name="phone"
            placeholder={t("bookings_add_form_phone")}
            value={formData.phone}
            onChange={handleChange}
            type="tel"
          />
        </Field>

        <Field>
          <FieldTitle>{t("bookings_add_form_email")}</FieldTitle>
          <TextInput
            name="email"
            placeholder={t("bookings_add_form_email")}
            value={formData.email}
            onChange={handleChange}
            type="email"
          />
        </Field>

        <Field>
          <FieldTitle>{t("bookings_add_form_roomNumber")}</FieldTitle>
          <TextInput
            name="roomNumber"
            placeholder={t("bookings_add_form_roomNumber")}
            value={formData.roomNumber}
            onChange={handleChange}
          />
        </Field>
      </TwoColGrid>

      <CheckboxRow>
        <input
          type="checkbox"
          name="specialRequest.status"
          checked={specialRequestStatus}
          onChange={handleSpecialRequestChange}
        />
        <span>{t("bookings_add_form_specialRequestCheck")}</span>
      </CheckboxRow>

      <Field>
        <FieldTitle>{t("bookings_add_form_specialRequestCheck")}</FieldTitle>
        <TextInput
          name="specialRequest.text"
          placeholder={t("bookings_add_form_specialRequestCheck")}
          value={formData.specialRequest.text}
          onChange={handleChange}
          disabled={!specialRequestStatus}
        />
      </Field>

      <SubmitButton type="submit">{t("bookings_add_form_button")}</SubmitButton>
      {submitStatus === "success" && (
        <Alert $type="success">{t("bookings_sended_successfully")}</Alert>
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
  height: 80%;
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

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  text-align: left;
  color: #212121;

  input[type="checkbox"] {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    background: #ffffff;
    cursor: pointer;

    &:checked {
      background: #6366f1;
      border-color: #6366f1;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        left: 5px;
        top: 2px;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    &:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
    }
  }
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

export default AddBookings;
