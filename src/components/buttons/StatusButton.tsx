import React from "react";
import styled from "styled-components";

export type StatusType = "Check In" | "Check Out" | "In progress";

interface StatusButtonProps {
  buttonStatus: StatusType;
}

const StatusButton: React.FC<StatusButtonProps> = ({ buttonStatus }) => {
  return (
    <ButtonStyled $buttonStatus={buttonStatus}>{buttonStatus}</ButtonStyled>
  );
};

const getBackgroundColor = (status: string): string => {
  switch (status) {
    case "Check In":
      return "#135846";
    case "Check Out":
      return "#FF0000";
    case "In progress":
      return "#FFA500";
    default:
      return "#ccc";
  }
};

const getTextColor = (status: string): string => {
  switch (status) {
    case "Check In":
    case "Check Out":
    case "In progress":
      return "#fff";
    default:
      return "#000";
  }
};

const ButtonStyled = styled.button<{ $buttonStatus: StatusType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 190px;
  height: 65px;
  border-radius: 8px;
  border: none;
  background-color: ${({ $buttonStatus }) => getBackgroundColor($buttonStatus)};
  color: ${({ $buttonStatus }) => getTextColor($buttonStatus)};
  font: normal normal 500 14px/21px Poppins;
`;

export default StatusButton;
