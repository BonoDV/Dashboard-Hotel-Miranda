import Table from "../../components/Table.tsx";
import Image from "../../components/Image.tsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/store.ts";
import { useTranslation } from "react-i18next";

import { fetchConcierges } from "../../redux/features/concierge/conciergeSlice.ts";
import Pagination from "../../components/Pagination.tsx";
import { Helmet } from "react-helmet";
function Concierge() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

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

  const cols = [
    t("concierge_table_name"),
    t("concierge_table_job_desk"),
    t("concierge_table_schedule"),
    t("concierge_table_contact"),
    t("concierge_table_status"),
  ];

  // Calcular el rango de habitaciones a mostrar
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedConcierges = concierges.slice(startIndex, endIndex);

  // Mapeamos los datos de ConciergeList
  const data = paginatedConcierges.map((res) => ({
    id: res.id,
    [t("concierge_table_name")]: (
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

    [t("concierge_table_job_desk")]: res.function_description,
    [t("concierge_table_schedule")]: res.schedule,
    [t("concierge_table_contact")]: res.phone_number,
    [t("concierge_table_status")]: res.status ? "Active" : "Inactive",
  }));

  if (loading)
    return <div style={{ color: "black" }}>{t("loading_concierge")}</div>;
  if (error)
    return (
      <div style={{ color: "black" }}>
        {t("loading_concierge_error")} {error}
      </div>
    );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(concierges.length / itemsPerPage);

  return (
    <>
      <Helmet>
        <title>Concierge</title>
        <meta
          name="description"
          content="Concierge page for Hotel Management System"
        />
      </Helmet>
      <div style={{ padding: "20px" }}>
        {/* Componente de la tabla */}
        <Table cols={cols} data={data} basePath={"users"} />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}

export default Concierge;
