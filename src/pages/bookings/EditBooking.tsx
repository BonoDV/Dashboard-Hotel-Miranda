import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  fetchGuestById,
  updateGuest,
} from "../../redux/features/guests/guestsSlice";
import { RootState, AppDispatch } from "../../redux/store/store";
import { formatDateForInput, parseInputDate } from "../../utils/dateUtils";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

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
  const { t } = useTranslation();

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

  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );

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
        [name]: parseInputDate(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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

    const dataToSend = {
      ...formData,
      orderDate: formatDateForInput(formData.orderDate),
      checkIn: formatDateForInput(formData.checkIn),
      checkOut: formatDateForInput(formData.checkOut),
      specialRequest: {
        ...formData.specialRequest,
        text: formData.specialRequest.status
          ? formData.specialRequest.text
          : "",
      },
    };
    dispatch(updateGuest(dataToSend));
    setSubmitStatus("success");
    console.log("Submitted:", dataToSend);
  };

  // Only return JSX after all hooks have been called
  if (loading) return <div>{t("loading_bookings")}</div>;
  if (error)
    return (
      <div>
        {t("loading_bookings_error")} {error}
      </div>
    );
  if (!user && !loading) return <div>{t("booking_not_found")}</div>;

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
            name="checkIn"
            value={formatDateForInput(formData.checkIn)}
            onChange={handleChange}
            type="datetime-local"
          />
        </Field>

        <Field>
          <FieldTitle>{t("bookings_add_form_checkOut")}</FieldTitle>
          <TextInput
            name="checkOut"
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
            type="number"
          />
        </Field>
      </TwoColGrid>

      <CheckboxRow>
        <input
          type="checkbox"
          name="specialRequest.status"
          checked={formData.specialRequest.status}
          onChange={handleChange}
        />
        <span>{t("bookings_add_form_specialRequestCheck")}</span>
      </CheckboxRow>

      <Field>
        <FieldTitle>{t("bookings_add_form_specialRequestCheck")}</FieldTitle>
        <TextArea
          name="specialRequest.text"
          placeholder={t("bookings_add_form_specialRequestCheck")}
          value={formData.specialRequest.text}
          onChange={handleChange}
          disabled={!formData.specialRequest.status}
        />
      </Field>

      <SubmitButton type="submit">
        {t("bookings_edit_form_button")}
      </SubmitButton>
      {submitStatus === "success" && (
        <Alert $type="success">{t("booking_updated_successfully")}</Alert>
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

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  text-align: left;
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

export default EditBooking;
