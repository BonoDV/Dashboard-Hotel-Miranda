import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

interface TableProps {
  cols: string[]; // Arreglo de strings representando los nombres de las columnas
  data: { [key: string]: string | number }[]; // Arreglo de objetos que representa las filas de la tabla
  basePath: string; // Ruta base para las acciones de navegación
}

const Table: React.FC<TableProps> = ({ cols, data, basePath }) => {
  const navigate = useNavigate();

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
    <div>
      <TableStyled>
        <thead>
          <tr>
            {cols.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {cols.map((col, colIndex) => (
                <td key={colIndex}>{row[col]}</td>
              ))}
              <td>
                <button onClick={() => handleView(row.id)}>Ver Detalles</button>
                <button onClick={() => handleEditView(row.id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableStyled>
    </div>
  );
};

const TableStyled = styled.table`
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 20px;
  width: 90%;
  height: 62.5rem;
  text-align: left;
  border-collapse: collapse;
  box-shadow: 13px 3px 40px var(--shadows);
  th:first-child,
  td:first-child {
    width: 20%; /* Ajusta este valor según lo que necesites */
  }

  th,
  td {
    padding: 0.5rem 1rem;
    vertical-align: top;
  }
`;

export default Table;
