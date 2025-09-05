import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

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

const facilityKeyMap: Record<string, string> = {
  "Air Aconditioner": "facilities.air_conditioner",
  "High speed WiFi": "facilities.high_speed_wifi",
  Breakfast: "facilities.breakfast",
  Kitchen: "facilities.kitchen",
  Cleaning: "facilities.cleaning",
  Shower: "facilities.shower",
  Grocery: "facilities.grocery",
  "Single bed": "facilities.single_bed",
  "Shop near": "facilities.shop_near",
  Towels: "facilities.towels",
  "24/7 Online Support": "facilities.online_support",
  "Strong Locker": "facilities.strong_locker",
  "Smart Security": "facilities.smart_security",
  "Expert Team": "facilities.expert_team",
};

type FacilitiesButtonProps = {
  facilities: string[];
};

const FacilitiesButton = ({ facilities }: FacilitiesButtonProps) => {
  const { t } = useTranslation();

  return (
    <FacilitiesContainer>
      {facilities.map((facility, index) => {
        const translationKey = facilityKeyMap[facility];
        const label = translationKey ? t(translationKey) : facility;
        return (
          <ButtonStyled key={index}>
            <Emoji>{amenitiesMap[facility] || "❓"}</Emoji>
            <p>{label}</p>
          </ButtonStyled>
        );
      })}
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
