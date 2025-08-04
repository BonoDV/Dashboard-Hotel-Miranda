import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  fetchConciergeById,
  updateConcierge,
} from "../../redux/features/concierge/conciergeSlice";
import { RootState, AppDispatch } from "../../redux/store/store";
import { formatDateForInput, parseInputDate } from "../../utils/dateUtils";
import type { Concierge } from "../../type/Concierge";

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
};

const EditConcierge: React.FC = () => {
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
  });

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
    const dataToSend: Concierge = {
      ...formData,
      start_date: formData.start_date || new Date(),
    };
    dispatch(updateConcierge(dataToSend));
    console.log("Submitted:", dataToSend);
  };

  // Only return JSX after all hooks have been called
  if (loading) return <p>Cargando datos del conserje...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user && !loading) return <p>Conserje no encontrado.</p>;

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
        name="photo"
        placeholder="URL de la foto"
        value={formData.photo}
        onChange={handleChange}
      />
      <input
        name="first_name"
        placeholder="Nombre"
        value={formData.first_name}
        onChange={handleChange}
      />
      <input
        name="last_name"
        placeholder="Apellido"
        value={formData.last_name}
        onChange={handleChange}
      />
      <input
        name="job"
        placeholder="Puesto de trabajo"
        value={formData.job}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="phone_number"
        placeholder="Número de teléfono"
        value={formData.phone_number}
        onChange={handleChange}
      />
      <input
        name="start_date"
        type="datetime-local"
        placeholder="Fecha de inicio"
        value={formatDateForInput(formData.start_date)}
        onChange={handleChange}
      />
      <input
        name="schedule"
        placeholder="Horario"
        value={formData.schedule}
        onChange={handleChange}
      />
      <textarea
        name="function_description"
        placeholder="Descripción de funciones"
        value={formData.function_description}
        onChange={handleChange}
      />
      <label>
        Estado activo:
        <input
          type="checkbox"
          name="status"
          checked={formData.status}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Actualizar Conserje</button>
    </form>
  );
};

export default EditConcierge;
