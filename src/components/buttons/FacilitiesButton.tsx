import React from "react";
import styled from "styled-components";

const amenitiesMap: Record<string, string> = {
  "Air Aconditioner": "❄️",
  "High speed WiFi": "📶",
  Breakfast: "🥐",
  Kitchen: "🍳",
  Cleaning: "🧹",
  Shower: "🚿",
  Grocery: "🛒",
  "Single bed": "🛏️",
  "Shop near": "🏪",
  Towels: "🧺",
  "24/7 Online Support": "💬",
  "Strong Locker": "🔒",
  "Smart Security": "🛡️",
  "Expert Team": "👨‍🔧",
};

type FacilitiesButtonProps = {
  facilities: string[];
};

const FacilitiesButton = ({ facilities }: FacilitiesButtonProps) => {
  return (
    <FacilitiesContainer>
      {facilities.map((facility, index) => (
        <ButtonStyled key={index}>
          <Emoji>{amenitiesMap[facility] || "❓"}</Emoji>
          <p>{facility}</p>
        </ButtonStyled>
      ))}
    </FacilitiesContainer>
  );
};

const FacilitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 190px;
  height: 65px;
  border-radius: 8px;
  border: none;
  background-color: #e8f2ef;
  gap: 10px;
  p {
    color: #135846;
    font: normal normal 500 14px/21px Poppins;
  }
`;

const Emoji = styled.span`
  font-size: 26px;
`;

export default FacilitiesButton;
