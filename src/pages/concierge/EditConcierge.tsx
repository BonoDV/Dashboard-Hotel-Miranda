import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  fetchConciergeById,
  updateConcierge,
} from "../../redux/features/concierge/conciergeSlice";
import { RootState, AppDispatch } from "../../redux/store/store";
import { formatDateForInput, parseInputDate } from "../../utils/dateUtils";
import type { Concierge } from "../../type/Concierge";
import styled from "styled-components";

type ConciergeFormData = {
  id: string;
  photo: string;
  first_name: string;
  last_name: string;
  job: string;
  email: string;
  phone_number: string;
  start_date: Date | null;
  schedule: string;
  function_description: string;
  status: boolean;
  password: string;
};

const EditConcierge: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const {
    concierge: user,
    loading,
    error,
  } = useSelector((state: RootState) => state.concierge);

  const [formData, setFormData] = useState<ConciergeFormData>({
    id: "",
    photo: "",
    first_name: "",
    last_name: "",
    job: "",
    email: "",
    phone_number: "",
    start_date: null,
    schedule: "",
    function_description: "",
    status: true,
    password: "",
  });

  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchConciergeById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (user && id) {
      setFormData({
        id: id || "",
        photo: user.photo || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        job: user.job || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        start_date: user.start_date ? new Date(user.start_date) : null,
        schedule: user.schedule || "",
        function_description: user.function_description || "",
        status: user.status || true,
        password: (user as any).password || "",
      });
    }
  }, [user, id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === "status") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, status: checked }));
    } else if (name === "start_date") {
      setFormData((prev) => ({
        ...prev,
        start_date: parseInputDate(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.photo ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.job ||
      !formData.email ||
      !formData.phone_number ||
      !formData.start_date ||
      !formData.schedule ||
      !formData.function_description
    ) {
      setSubmitStatus("error");
      return;
    }

    const dataToSend: Concierge = {
      ...formData,
      start_date: formData.start_date || new Date(),
    };
    dispatch(updateConcierge(dataToSend));
    setSubmitStatus("success");
    console.log("Submitted:", dataToSend);
  };

  // Only return JSX after all hooks have been called
  if (loading)
    return <p style={{ color: "black" }}>{t("concierge_edit.loading")}</p>;
  if (error)
    return (
      <p style={{ color: "black" }}>
        {t("concierge_edit.error")}
        {error}
      </p>
    );
  if (!user && !loading)
    return <p style={{ color: "black" }}>{t("concierge_edit.not_found")}</p>;

  return (
    <CardForm onSubmit={handleSubmit}>
      <TwoColGrid>
        <Field>
          <FieldTitle>{t("concierge_edit.photo_url")}</FieldTitle>
          <TextInput
            name="photo"
            placeholder={t("concierge_edit.photo_placeholder")}
            value={formData.photo}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <FieldTitle>{t("concierge_edit.first_name")}</FieldTitle>
          <TextInput
            name="first_name"
            placeholder={t("concierge_edit.first_name_placeholder")}
            value={formData.first_name}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <FieldTitle>{t("concierge_edit.last_name")}</FieldTitle>
          <TextInput
            name="last_name"
            placeholder={t("concierge_edit.last_name_placeholder")}
            value={formData.last_name}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <FieldTitle>{t("concierge_edit.job")}</FieldTitle>
          <TextInput
            name="job"
            placeholder={t("concierge_edit.job_placeholder")}
            value={formData.job}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <FieldTitle>{t("concierge_edit.email")}</FieldTitle>
          <TextInput
            name="email"
            type="email"
            placeholder={t("concierge_edit.email_placeholder")}
            value={formData.email}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <FieldTitle>{t("concierge_edit.phone")}</FieldTitle>
          <TextInput
            name="phone_number"
            placeholder={t("concierge_edit.phone_placeholder")}
            value={formData.phone_number}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <FieldTitle>{t("concierge_edit.start_date")}</FieldTitle>
          <TextInput
            name="start_date"
            type="datetime-local"
            value={formatDateForInput(formData.start_date)}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <FieldTitle>{t("concierge_edit.schedule")}</FieldTitle>
          <TextInput
            name="schedule"
            placeholder={t("concierge_edit.schedule_placeholder")}
            value={formData.schedule}
            onChange={handleChange}
          />
        </Field>

        <Field style={{ gridColumn: "1 / -1" }}>
          <FieldTitle>{t("concierge_edit.function_description")}</FieldTitle>
          <TextArea
            name="function_description"
            placeholder={t("concierge_edit.function_description_placeholder")}
            value={formData.function_description}
            onChange={handleChange}
          />
        </Field>
      </TwoColGrid>

      <CheckBox>
        <input
          type="checkbox"
          name="status"
          checked={formData.status}
          onChange={handleChange}
        />
        <span>{t("concierge_edit.status")}</span>
      </CheckBox>

      <SubmitButton type="submit">
        {t("concierge_edit.update_button")}
      </SubmitButton>

      {submitStatus === "success" && (
        <Alert $type="success">{t("concierge_edit.success_message")}</Alert>
      )}

      {submitStatus === "error" && (
        <Alert $type="error">{t("concierge_edit.error_message")}</Alert>
      )}
    </CardForm>
  );
};

export default EditConcierge;

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
  strong {
    color: #135846;
  }
`;

const FieldTitle = styled.span`
  color: #212121;
  font-size: 14px;
  strong {
    color: #135846;
  }
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

const CheckBox = styled.label`
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
