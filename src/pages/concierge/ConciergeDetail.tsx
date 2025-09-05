import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CallButton from "../../components/buttons/CallButon.js";
import SendMessageButton from "../../components/buttons/SendMessageButton.tsx";
import Image from "../../components/Image.tsx";
import { RootState, AppDispatch } from "../../redux/store/store.ts";
import { fetchConciergeById } from "../../redux/features/concierge/conciergeSlice.ts";

const ConciergeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { concierge, loading, error } = useSelector(
    (state: RootState) => state.concierge
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchConciergeById(id));
    }
  }, [dispatch, id]);

  if (loading) return <p>Cargando datos del trabajador...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!concierge) return <p>Trabajador no encontrado.</p>;

  // Función para formatear la fecha
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "13px 3px 40px var(--shadows)",
      }}
    >
      {/* Encabezado: Imagen + Info básica */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <Image
          src={concierge.photo}
          alt={`${concierge.first_name} ${concierge.last_name}`}
          style={{ width: "156px", height: "156px", borderRadius: "12px" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1
            style={{ fontSize: "28px", fontWeight: "600", margin: "0 0 8px 0" }}
          >
            {concierge.first_name} {concierge.last_name}
          </h1>
          <p style={{ color: "#888", fontSize: "18px", margin: "0 0 8px 0" }}>
            {concierge.job}
          </p>
          <p style={{ color: "#666", margin: "0" }}>{concierge.schedule}</p>
        </div>
      </div>
            <CallButton phone={concierge.phone_number} />
            <SendMessageButton email={concierge.email} />

      {/* Información de contacto */}
      <div style={{ marginBottom: "32px" }}>
        <h2
          style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}
        >
          Información de Contacto
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div>
            <p style={{ color: "#888", marginBottom: "4px" }}>Email</p>
            <p style={{ fontWeight: "500" }}>{concierge.email}</p>
          </div>
          <div>
            <p style={{ color: "#888", marginBottom: "4px" }}>Teléfono</p>
            <p style={{ fontWeight: "500" }}>{concierge.phone_number}</p>
          </div>
        </div>
      </div>

      {/* Información laboral */}
      <div style={{ marginBottom: "32px" }}>
        <h2
          style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}
        >
          Información Laboral
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div>
            <p style={{ color: "#888", marginBottom: "4px" }}>Cargo</p>
            <p style={{ fontWeight: "500" }}>{concierge.job}</p>
          </div>
          <div>
            <p style={{ color: "#888", marginBottom: "4px" }}>
              Fecha de Inicio
            </p>
            <p style={{ fontWeight: "500" }}>
              {formatDate(concierge.start_date)}
            </p>
          </div>
          <div>
            <p style={{ color: "#888", marginBottom: "4px" }}>Horario</p>
            <p style={{ fontWeight: "500" }}>{concierge.schedule}</p>
          </div>
          <div>
            <p style={{ color: "#888", marginBottom: "4px" }}>Estado</p>
            <p style={{ fontWeight: "500" }}>
              <span
                style={{
                  color: concierge.status ? "#22c55e" : "#ef4444",
                  fontWeight: "600",
                }}
              >
                {concierge.status ? "Activo" : "Inactivo"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Descripción de funciones */}
      <div style={{ marginBottom: "32px" }}>
        <h2
          style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}
        >
          Descripción de Funciones
        </h2>
        <p style={{ lineHeight: "1.6", color: "#333" }}>
          {concierge.function_description}
        </p>
      </div>

      {/* Botones de acción */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          paddingTop: "24px",
          borderTop: "1px solid #E5E5E5",
        }}
      >
      </div>
    </div>
  );
};

export default ConciergeDetail;
