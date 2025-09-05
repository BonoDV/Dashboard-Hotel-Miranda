import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
type SpecialRequestType = "None Request" | string;

interface SpecialRequestButtonProps {
  specialRequest?: SpecialRequestType;
  onClick?: () => void;
}

const SpecialRequestButton: React.FC<SpecialRequestButtonProps> = ({
  specialRequest = t("bookings_special_request_false"),
  onClick,
}) => {
  const { t } = useTranslation();
  const isNone = specialRequest === t("bookings_special_request_false");

  return (
    <ButtonStyled
      $buttonStatus={specialRequest}
      onClick={!isNone ? onClick : undefined}
      disabled={isNone}
    >
      {!isNone
        ? t("bookings_special_request_true")
        : t("bookings_special_request_false")}
    </ButtonStyled>
  );
};

const getBackgroundColor = (status: SpecialRequestType): string => {
  return status === t("bookings_special_request_false") ? "#FFFFFF" : "#EEF9F2";
};

const getTextColor = (status: SpecialRequestType): string => {
  return status === t("bookings_special_request_false") ? "#cfd8d2" : "#212121";
};

const getBorderStyle = (status: SpecialRequestType): string => {
  return status === t("bookings_special_request_false")
    ? "none"
    : "2px solid #000000";
};

const ButtonStyled = styled.button<{ $buttonStatus: SpecialRequestType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 190px;
  height: 65px;
  border-radius: 8px;
  background-color: ${({ $buttonStatus }) => getBackgroundColor($buttonStatus)};
  color: ${({ $buttonStatus }) => getTextColor($buttonStatus)};
  cursor: ${({ $buttonStatus }) =>
    $buttonStatus === t("bookings_special_request_false")
      ? "not-allowed"
      : "pointer"};
  font: normal normal 500 14px/21px Poppins;
  border: none;
  &:hover {
    border: ${({ $buttonStatus }) => getBorderStyle($buttonStatus)};
  }
`;

export default SpecialRequestButton;
