import { MdOutlineReviews } from "react-icons/md";
import { IoMdContacts } from "react-icons/io";
import { Link } from "react-router";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { FaHotel } from "react-icons/fa";
import { TbStarsFilled } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiKey2Line } from "react-icons/ri";
import { LuCalendarCheck } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

import { useTranslation } from "react-i18next";

import Image from "./Image.jsx";
function SideBar() {
  const { t } = useTranslation();

  /*     const changeLanguage = (lng) => {
          i18n.changeLanguage(lng);
      }; */

  return (
    <div
      style={{
        marginLeft: "1rem",
        boxShadow: "13px 3px 40px #00000005",
        borderRight: "1px solid black",
        height: "100vh", // Cambiado de 90vh a 100vh
        position: "sticky",
        top: 0,
      }}
    >
      <HeaderContainer>
        <IconContainer>
          <IconContext.Provider value={{ color: "#135846", size: "3rem" }}>
            <FaHotel />
          </IconContext.Provider>
          <SmallIcon>
            <IconContext.Provider value={{ color: "#E23428", size: "1rem" }}>
              <TbStarsFilled />
            </IconContext.Provider>
          </SmallIcon>
        </IconContainer>
        <TextContainer>
          <MainText>travl</MainText>
          <SubText>Hotel Admin Dashboard</SubText>
        </TextContainer>
      </HeaderContainer>

      <StyledNav>
        <StyledList>
          <li style={{ marginBottom: "1rem" }}>
            <StyledLink to="/dashboard">
              <LuLayoutDashboard /> {t("dashboard")}
            </StyledLink>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <StyledLink to="booking">
              <LuCalendarCheck /> {t("bookings")}
            </StyledLink>{" "}
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <StyledLink to="room">
              <RiKey2Line /> {t("room")}
            </StyledLink>
            <IoIosArrowDown />
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <StyledLink to="contact">
              <MdOutlineReviews /> {t("contact")}
            </StyledLink>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <StyledLink to="users">
              <IoPersonOutline /> {t("users")}
            </StyledLink>
          </li>
        </StyledList>
      </StyledNav>

      <UserSquare>
        <Image
          src="https://randomuser.me/api/portraits/men/12.jpg"
          alt="avatar"
        />
        <h2>William Johanson</h2>
        <p>williamjohn@mail.com</p>
        <ContactButton>{t("employee_edit_button")}</ContactButton>
      </UserSquare>
      <CopyrightDiv>
        <h2>Travl Hotel Admin Dashboard</h2>
        <p>© 2025 All Rights Reserved</p>
      </CopyrightDiv>
    </div>
  );
}

// Contenedor principal para íconos y textos
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

const IconContainer = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
`;

const SmallIcon = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  z-index: 1;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #135846;
`;

const SubText = styled.span`
  font-size: 0.8rem;
  color: #6e6e6e;
`;

const StyledNav = styled.nav`
  width: 12.5rem;
  text-align: left;
  font: normal normal 600 18px/27px Poppins;
  letter-spacing: 0px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit; // Hereda el color del padre (generalmente negro)

  &:visited {
    color: inherit; // Mantiene el mismo color que los enlaces no visitados
  }

  &:hover {
    color: #135846; // Color al pasar el mouse (opcional)
  }
`;

const StyledList = styled.ul`
  list-style: none; /* Elimina los bullets */
  margin: 0; /* Opcional: elimina el margen por defecto */
  width: 100%;
`;

const UserSquare = styled.div`
  width: 14.56rem;
  height: 13.81rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  margin-top: 30%;
  border: 1px solid red;
  position: relative; /* Necesario para posicionar el div interno de forma absoluta */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* Estilos para el div interno (ahora posicionado encima) */
  div {
    border: 1px solid #ebebeb;
    border-radius: 8px;
    font-family: "Poppins", sans-serif;
    background-color: #c5c5c5;
    width: 4rem;
    height: 4rem;
    position: absolute;
    top: -2rem; /* Lo mueve hacia arriba la mitad de su altura */
    left: 50%;
    transform: translateX(-50%); /* Centrado horizontal */
  }

  h2,
  p {
    width: 100%;
    text-align: center;
    font-style: normal;
    font-weight: 500;
    font-variant: normal;
    font-size: 16px;
    line-height: 25px;
    font-family: Poppins;
    margin: 0.5rem 0; /* Espaciado entre elementos */
  }

  p {
    font-style: normal;
    font-variant: normal;
    font-size: 12px;
    font-weight: 300;
    line-height: 18px;
    font-family: Poppins;
    color: #b2b2b2; /* Color secundario para el email */
  }
`;

const ContactButton = styled.button`
  width: 10rem;
  height: 3rem;
  background-color: #ebf1ef;
  border-radius: 8px;
  border: none;

  color: #135846;
  text-align: center;
  font-variant: normal;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0px;
  font-family: Poppins;
`;

const CopyrightDiv = styled.div`
  margin-top: 3.8rem;

  h2 {
    width: 100%;
    height: 1.5625rem;

    text-align: left;
    font: normal normal 600 14px/25px Poppins;
    letter-spacing: 0px;
    color: #212121;
  }

  p {
    text-align: left;
    font: normal normal 300 14px/21px Poppins;
    letter-spacing: 0px;
    color: #799283;
  }
`;

export default SideBar;
