import React from 'react';
import styled from 'styled-components';

// Cols -> objects array representing each column.
// Data -> objects array representing each row. Example: rooms, bookings, etc.

const Table = ({ cols, data }) => {
    return (
        <div>
            <TableStyled>
                <thead>
                    <tr>
                        {cols.map((col, index) => (
                            <th key={index}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {cols.map((col, colIndex) => (
                                <td key={colIndex}>{row[col]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </TableStyled>
        </div>
    );
};

const TableStyled = styled.table`
    background-color: #ffffff;
    border-radius: 20px;
    width: 90%;
    height: 62.5rem;
    text-align: left;
`;


export default Table;