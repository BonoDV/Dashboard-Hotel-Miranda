import Table from "../../components/Table.tsx";
import Image from "../../components/Image.tsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/store.ts";

import { fetchConcierges } from "../../redux/features/concierge/conciergeSlice.ts";
function Concierge() {
  const dispatch = useDispatch<AppDispatch>();

  // Seleccionamos los datos desde el store
  const { concierges, loading, error } = useSelector(
    (state: RootState) => state.concierge
  );
  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchConcierges());
  }, [dispatch]);

  const cols = ["Name", "Job Desk", "Schedule", "Contact", "Status"];

  // Calcular el rango de habitaciones a mostrar
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedConcierges = concierges.slice(startIndex, endIndex);

  // Mapeamos los datos de ConciergeList
  const data = paginatedConcierges.map((res) => ({
    id: res.id,
    Name: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image
          src={res.photo}
          alt="Concierge"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "10px",
          }}
        >
          <span>
            {res.first_name} {res.last_name}
          </span>
          <span>#{res.id}</span>
          <span>{new Date(res.start_date).toLocaleDateString()}</span>
        </div>
      </div>
    ),

    "Job Desk": res.function_description,
    Schedule: res.schedule,
    Contact: res.phone_number,
    Status: res.status ? "Active" : "Inactive",
  }));

  if (loading) return <div>Loading concierges...</div>;
  if (error) return <div>Error loading concierges: {error}</div>;

  // Calcular el número total de páginas
  const totalPages = Math.ceil(concierges.length / itemsPerPage);

  return (
    <div style={{ padding: "20px" }}>
      {/* Componente de la tabla */}
      <Table cols={cols} data={data} basePath={"users"} />
      {/* Controles de paginación */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Concierge;
