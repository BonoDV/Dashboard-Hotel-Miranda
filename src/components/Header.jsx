import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { IconContext } from "react-icons";
import { FaArrowLeft as ArrowLeftIcon } from "react-icons/fa";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { FaHeart as HeartIcon, FaBell as BellIcon } from "react-icons/fa";
import { MdEmail as EmailIcon } from "react-icons/md";
import { LuMessageSquare as MessageIcon } from "react-icons/lu";

import { useTranslation } from "react-i18next";

import { useLocation } from "react-router";
import Breadcrumb from "./Breadcrumb.tsx";
import Image from "./Image.jsx";
const Header = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const location = useLocation();
  const originalPath = location.pathname;
  const path = location.pathname.split("/").filter(Boolean).pop(); // Obtener la última parte de la ruta
  let pathCapitalize = path.charAt(0).toUpperCase() + path.slice(1); // Capitalizar la primera letra

  if (
    pathCapitalize === "Guest" ||
    pathCapitalize === "Concierge" ||
    pathCapitalize === "Room"
  ) {
    pathCapitalize = `${pathCapitalize} List`; // Cambiar a Dashboard si es Guest o Concierge
  }

  const shouldShowBreadcrumb = () => {
    return (
      originalPath.includes("/booking/") &&
      originalPath.split("/").filter(Boolean).length > 1
    );
  };

  useEffect(() => {
    // Sincronizar con cambios externos del idioma
    const handleLanguageChange = (lng) => {
      setSelectedLanguage(lng);
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  const changeLanguage = (event) => {
    const lng = event.target.value.toLowerCase();
    i18n
      .changeLanguage(lng)
      .then(() => {
        setSelectedLanguage(lng); // Actualizar estado local
        localStorage.setItem("i18nextLng", lng);
      })
      .catch((err) => console.error("Error changing language:", err));
  };

  return (
    <HeaderStyled>
      <IconContext.Provider value={{ size: "2rem" }}>
        <ArrowLeftIcon />
      </IconContext.Provider>
      <LeftSection hasBreadcrumb={shouldShowBreadcrumb()}>
        <DashboardTitleStyled>{pathCapitalize}</DashboardTitleStyled>
        {shouldShowBreadcrumb() && <Breadcrumb />}
      </LeftSection>
      <RightSection>
        <IconContext.Provider value={{ size: "2rem" }}>
          <SearchIcon />
        </IconContext.Provider>
        <IconContext.Provider value={{ size: "2rem" }}>
          <HeartIcon />
        </IconContext.Provider>
        <IconContext.Provider value={{ size: "2rem" }}>
          <EmailIcon />
        </IconContext.Provider>
        <IconContext.Provider value={{ size: "2rem" }}>
          <BellIcon />
        </IconContext.Provider>
        <IconContext.Provider value={{ size: "2rem" }}>
          <MessageIcon />
        </IconContext.Provider>
        <Image src="https://randomuser.me/api/portraits/men/12.jpg" />
        <div
          style={{ background: "#EBEBEB 0% 0% no-repeat padding-box" }}
        ></div>
        <TextSelectStyled onChange={changeLanguage} value={selectedLanguage}>
          <option value="en">EN</option>
          <option value="es">ES</option>
          <option value="va">VA</option>
        </TextSelectStyled>
      </RightSection>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid black;
  height: 80px; // Altura fija para el header
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 40%;
  margin-right: ${({ hasBreadcrumb }) => (hasBreadcrumb ? "40%" : "50%")};
  margin-top: ${({ hasBreadcrumb }) => (hasBreadcrumb ? "1rem" : "0")};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative; /* Para el posicionamiento del UserSquareDivStyled */
`;

const DashboardTitleStyled = styled.h2`
  color: var(--unnamed-color-262626);
  text-align: left;
  font: normal normal 600 28px/42px Poppins;
  letter-spacing: 0px;
  color: #262626;
  opacity: 1;
  margin: 0; /* Elimina el margen por defecto del h2 */
`;

const TextSelectStyled = styled.select`
  border: none;
  background: none;
  color: var(--secondary-color);
  padding: 8px 12px;
  font-size: 1rem;
  font-weight: 600;
  font-family: poppins;
  width: 70px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg width='10' height='7' viewBox='0 0 10 7' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23135846' stroke-width='2' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
  color: #e23428;
  &:focus {
    outline: none;
  }
`;

export default Header;
