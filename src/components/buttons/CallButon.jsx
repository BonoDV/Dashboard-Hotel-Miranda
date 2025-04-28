import { FaPhoneAlt } from "react-icons/fa"; 
import { IconContext } from "react-icons";
import React from 'react';
import styled from 'styled-components';

const CallButton = (params) => {
    return (
        <a href={`tel:${params.phone}`}>
        <ButtonStyled>
            <IconContext.Provider value={{ size: "20px", color: "#135846" }}>
                <FaPhoneAlt />
            </IconContext.Provider>
        </ButtonStyled>
        </a>
    );
};

const ButtonStyled = styled.button`
width: 60px;
height: 60px;
border: 1px solid #E8F2EF;
border-radius: 12px;
cursor: pointer;
`;

export default CallButton;