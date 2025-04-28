import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

// Cols -> objects array representing each column.
// Data -> objects array representing each row. Example: rooms, bookings, etc.

const Table = ({ cols, data, basePath }) => {
    const navigate = useNavigate();

    const handleView = (id) => {
        navigate(`/dashboard/${basePath}/${id}`);
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
                                <button onClick={() => handleView(row.id)}>
                                    Ver Detalles
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </TableStyled>
        </div>
    );
};


const TableStyled = styled.table`
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border-radius: 20px;
    width: 90%;
    height: 62.5rem;
    text-align: left;
`;


export default Table;