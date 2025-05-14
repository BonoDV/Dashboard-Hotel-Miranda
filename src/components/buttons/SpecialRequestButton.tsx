import React from "react";
import styled from "styled-components";

interface SpecialRequestButtonProps {
  specialRequest?: string;
  onClick?: () => void;
}

const SpecialRequestButton: React.FC<SpecialRequestButtonProps> = ({
  specialRequest = "None Request",
  onClick,
}) => {
  const isNone = specialRequest === "None Request";

  return (
    <ButtonStyled
      $buttonStatus={specialRequest}
      onClick={!isNone ? onClick : undefined}
    >
      {!isNone ? "View Request" : "None Request"}
    </ButtonStyled>
  );
};

const getBackgroundColor = (status: string): string => {
  switch (status) {
    case "None Request":
      return "#FFFFFF";
    default:
      return "#EEF9F2";
  }
};

const getTextColor = (status: string): string => {
  switch (status) {
    case "None Request":
      return "#cfd8d2";
    default:
      return "#212121";
  }
};

const ButtonStyled = styled.button<{ $buttonStatus: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 190px;
  height: 65px;
  border-radius: 8px;
  border: none;
  background-color: ${({ $buttonStatus }) => getBackgroundColor($buttonStatus)};
  color: ${({ $buttonStatus }) => getTextColor($buttonStatus)};
  cursor: ${({ $buttonStatus }) =>
    $buttonStatus === "None Request" ? "not-allowed" : "pointer"};
  font: normal normal 500 14px/21px Poppins;
`;

export default SpecialRequestButton;

