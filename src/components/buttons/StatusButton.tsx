import React from "react";
import styled from "styled-components";

export type StatusType =
  | "Check In"
  | "Check Out"
  | "In progress"
  | "Cancelled"
  | "Booked"
  | "Available"
  | "Refund";

interface StatusButtonProps {
  buttonStatus: StatusType;
  useRedForBooked?: boolean;
}

const StatusButton: React.FC<StatusButtonProps> = ({
  buttonStatus,
  useRedForBooked = false,
}) => {
  return (
    <ButtonStyled
      $buttonStatus={buttonStatus}
      $useRedForBooked={useRedForBooked}
    >
      {buttonStatus}
    </ButtonStyled>
  );
};

const getBackgroundColor = (
  status: string,
  useRedForBooked: boolean = false
): string => {
  switch (status) {
    case "Check In":
      return "#135846";
    case "Check Out":
      return "#FF0000";
    case "In progress":
      return "#FFA500";
    case "Available":
      return "#13ab34";
    case "Cancelled":
      return "#FF0000";
    case "Booked":
      return useRedForBooked ? "#9e9e9e" : "#28a745";
    case "Refund":
      return "#87CEEB";
    default:
      return "#ccc";
  }
};

const getTextColor = (status: string): string => {
  switch (status) {
    case "Check In":
    case "Check Out":
    case "In progress":
    case "Available":
    case "Cancelled":
    case "Booked":
      return "#fff";
    case "Refund":
      return "#000";
    default:
      return "#000";
  }
};

const getFontWeight = (status: string): string => {
  switch (status) {
    case "Available":
    case "Cancelled":
    case "Booked":
      return "bold";
    default:
      return "500";
  }
};

const ButtonStyled = styled.button<{
  $buttonStatus: StatusType;
  $useRedForBooked?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 190px;
  height: 65px;
  border-radius: 8px;
  border: none;
  background-color: ${({ $buttonStatus, $useRedForBooked }) =>
    getBackgroundColor($buttonStatus, $useRedForBooked)};
  color: ${({ $buttonStatus }) => getTextColor($buttonStatus)};
  font: normal normal ${({ $buttonStatus }) => getFontWeight($buttonStatus)}
    14px/21px Poppins;
`;

export default StatusButton;
