import React, { JSX } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

type TableRow = Record<string, string | number | JSX.Element>;

interface TableProps {
  cols: string[]; // Arreglo de strings representando los nombres de las columnas
  data: TableRow[]; // Arreglo de objetos que representa las filas de la tabla
  basePath: string; // Ruta base para las acciones de navegación
  showActions?: boolean; // Nueva prop para mostrar/ocultar acciones
}

const Table: React.FC<TableProps> = ({
  cols,
  data,
  basePath,
  showActions = true,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Función para navegar a la vista de detalles
  const handleView = (id: string | number) => {
    console.log(`/dashboard/${basePath}/${id}`);
    navigate(`/dashboard/${basePath}/${id}`);
  };

  // Función para navegar a la vista de edición
  const handleEditView = (id: string | number) => {
    navigate(`/dashboard/${basePath}/edit/${id}`);
  };

  return (
    <TableContainer>
      <TableStyled>
        <thead>
          <tr>
            {cols.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
            {showActions && <th>{t("bookings_table_actions")}</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {cols.map((col, colIndex) => (
                <td key={colIndex}>{row[col]}</td>
              ))}
              {showActions && (
                <td>
                  <ActionButtons>
                    <ViewButton
                      onClick={() => handleView(row.id as string | number)}
                    >
                      {t("table_action_detail")}
                    </ViewButton>
                    <EditButton
                      onClick={() => handleEditView(row.id as string | number)}
                    >
                      {t("table_action_edit")}
                    </EditButton>
                  </ActionButtons>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </TableStyled>
    </TableContainer>
  );
};

const TableContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  overflow-x: auto;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
`;

const TableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 16px;
  overflow: hidden;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;

  thead {
    background: linear-gradient(135deg, #90cebd 0%, #23a482 100%);
    color: white;

    th {
      padding: 16px 20px;
      font-weight: 600;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border: none;
      position: relative;

      &:not(:last-child)::after {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 60%;
        width: 1px;
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }

  tbody {
    tr {
      transition: all 0.2s ease-in-out;
      border-bottom: 1px solid #f8f9fa;

      &:hover {
        background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
      }

      &:last-child {
        border-bottom: none;
      }
    }

    td {
      padding: 16px 20px;
      font-size: 13px;
      color: #4a5568;
      vertical-align: middle;
      border: none;

      &:first-child {
        font-weight: 600;
        color: #2d3748;
      }
    }
  }

  @media (max-width: 768px) {
    thead th,
    tbody td {
      padding: 12px 16px;
      font-size: 12px;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 6px;
  }
`;

const ButtonBase = styled.button`
  padding: 10px 16px;
  height: 36px;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ViewButton = styled(ButtonBase)`
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;

  &:hover {
    background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
  }
`;

const EditButton = styled(ButtonBase)`
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;

  &:hover {
    background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
  }
`;

export default Table;
