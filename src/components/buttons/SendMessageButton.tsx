import { AiFillMessage } from "react-icons/ai"; 
import { IconContext } from "react-icons";
import React from 'react';
import styled from 'styled-components';

type CallButtonProps = {
  email: string;
};

const SendMessageButton = ({ email }: CallButtonProps) => {
    return (
        <a href={`mailto:${email}`} style={{ marginLeft: '20px' }}>
            <ButtonStyled>
                <IconContext.Provider value={{ size: "24px", color: "#ffffff" }}>
                    <AiFillMessage style={{ marginRight: "10px", marginTop: "5px" }} />
                </IconContext.Provider>
                <span style={{ color: "#ffffff", margin:"0 auto", position: 'relative', top: '-5px', fontFamily: 'poppins' }}>Send Message</span>
            </ButtonStyled>
        </a>
    );
};

const ButtonStyled = styled.button`
    width: 220px;
    height: 60px;
    border-radius: 12px;
    border: none;
    background-color: #135846;
    cursor: pointer;
`;

export default SendMessageButton;
