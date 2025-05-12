import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SpecialRequestButton = ({ specialRequest, onClick }) => {
  const isNone = specialRequest === "None Request";

  return (
    <ButtonStyled
      buttonStatus={specialRequest}
      onClick={!isNone ? onClick : undefined}
    >
      {!isNone ? "View Request" : "None Request"}
    </ButtonStyled>
  );
};

const getBackgroundColor = (status) => {
  switch (status) {
    case "None Request":
      return "#FFFFFF";
    default:
      return "#EEF9F2";
  }
};

const getTextColor = (status) => {
  switch (status) {
    case "None Request":
      return "#cfd8d2";
    default:
      return "#212121";
  }
};

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 190px;
  height: 65px;
  border-radius: 8px;
  border: none;
  background-color: ${({ buttonStatus }) => getBackgroundColor(buttonStatus)};
  color: ${({ buttonStatus }) => getTextColor(buttonStatus)};
  cursor: ${({ buttonStatus }) =>
    buttonStatus === "None Request" ? "not-allowed" : "pointer"};
  font: normal normal 500 14px/21px Poppins;
`;

SpecialRequestButton.defaultProps = {
  specialRequest: "None Request",
};

SpecialRequestButton.propTypes = {
  specialRequest: PropTypes.string,
  onClick: PropTypes.func,
};

export default SpecialRequestButton;
