import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
};

const Pagination: React.FC<Props> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        gap: "15px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        style={{
          padding: "8px 16px",
          backgroundColor: currentPage === 1 ? "#d2ffd4" : "#328d5f",
          color: currentPage === 1 ? "#666" : "white",
          border: "none",
          borderRadius: "6px",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          fontSize: "14px",
          textTransform: "uppercase",
          fontWeight: "500",
          transition: "all 0.2s ease",
          boxShadow:
            currentPage === 1 ? "none" : "0 2px 4px rgba(0,123,255,0.2)",
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (currentPage !== 1) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#1f5a3c";
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(-1px)";
          }
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (currentPage !== 1) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#328d5f";
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(0)";
          }
        }}
      >
        {t("table_page_back")}
      </button>

      <span
        style={{
          fontSize: "16px",
          fontWeight: "600",
          color: "#333",
          padding: "8px 16px",
          backgroundColor: "#f8f9fa",
          borderRadius: "6px",
          border: "1px solid #dee2e6",
          minWidth: "120px",
          textAlign: "center",
        }}
      >
        {t("table_page")} {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        style={{
          padding: "8px 16px",
          backgroundColor: currentPage === totalPages ? "#c3eeff" : "#007bff",
          color: currentPage === totalPages ? "#666" : "white",
          border: "none",
          borderRadius: "6px",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          fontSize: "14px",
          textTransform: "uppercase",
          fontWeight: "500",
          transition: "all 0.2s ease",
          boxShadow:
            currentPage === totalPages
              ? "none"
              : "0 2px 4px rgba(0,123,255,0.2)",
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (currentPage !== totalPages) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#0056b3";
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(-1px)";
          }
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (currentPage !== totalPages) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#007bff";
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(0)";
          }
        }}
      >
        {t("table_page_post")}
      </button>
    </div>
  );
};

export default Pagination;
