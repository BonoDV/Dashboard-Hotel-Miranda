import React from 'react';
import styled from 'styled-components';

const amenitiesMap = {
  "TV": "📺",
  "Wi-Fi": "📶",
  "Work Desk": "💼",
  "Minibar": "🍸",
  "24h Room Service": "🛎️",
  "Bathub": "🛁",
  "Espresso Machine": "☕",
  "Sea View": "🌊",
  "Private Jacuzzi": "♨️",
  "Butler Service": "🤵",
  "Rainfall Shower": "🚿",
  "Balcony": "🌇",
  "Pillow Menu": "🛏️",
  "Smart TV": "📺",
  "Soundproofing": "🔇",
  "Nespresso Machine": "☕",
  "Aromatherapy System": "🌺",
  "Luxury Linens": "🛌",
  "Heated Floors": "🔥",
  "City View": "🏙️",
  "Curated Minibar": "🥂",
  "Terrace": "🏖️",
  "Grand Piano": "🎹",
  "Private Chef": "👨‍🍳",
  "Blackout Curtains": "🪟",
  "Silk Robes": "👘",
  "Mood Lighting": "💡",
  "Marble Bathroom": "🛁",
  "Art Collection": "🖼️",
};

const FacilitiesButton = ({ facilities }) => {
  return (
    <FacilitiesContainer>
      {facilities.map((facility, index) => (
        <ButtonStyled key={index}>
            <Emoji>{amenitiesMap[facility] || '❓'}</Emoji>
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
  cursor: pointer;
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
