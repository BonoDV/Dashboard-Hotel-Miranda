import { FaPhoneAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import React from "react";
import styled from "styled-components";

type CallButtonProps = {
  phone: string;
};

const CallButton = ({ phone }: CallButtonProps) => {
  return (
    <a href={`tel:${phone}`}>
      <ButtonStyled>
        <IconContext.Provider value={{ size: "20px", color: "#135846" }}>
          <FaPhoneAlt aria-label="Phone icon" />
        </IconContext.Provider>
      </ButtonStyled>
    </a>
  );
};

const ButtonStyled = styled.button`
  width: 60px;
  height: 60px;
  border: 1px solid #004319;
  border-radius: 12px;
  cursor: pointer;
  background-color: #f7f7f7;
`;

export default CallButton;
