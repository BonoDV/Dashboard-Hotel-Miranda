import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { IconContext } from "react-icons";
import { FaArrowLeft as ArrowLeftIcon } from "react-icons/fa";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { FaHeart as HeartIcon, FaBell as BellIcon } from "react-icons/fa";
import { MdEmail as EmailIcon } from "react-icons/md";
import { LuMessageSquare as MessageIcon } from "react-icons/lu";

import { useTranslation } from 'react-i18next';

const Header = () => {
    const { i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    useEffect(() => {
        // Sincronizar con cambios externos del idioma
        const handleLanguageChange = (lng) => {
            setSelectedLanguage(lng);
        };

        i18n.on('languageChanged', handleLanguageChange);
        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, [i18n]);

    const changeLanguage = (event) => {
        const lng = event.target.value.toLowerCase();
        i18n.changeLanguage(lng)
            .then(() => {
                setSelectedLanguage(lng); // Actualizar estado local
                localStorage.setItem('i18nextLng', lng);
            })
            .catch(err => console.error('Error changing language:', err));
    };

    return (
        <HeaderStyled>
            <LeftSection>
                <IconContext.Provider value={{ size: "2rem" }}>
                    <ArrowLeftIcon />
                </IconContext.Provider>
                <DashboardTitleStyled>Dashboard</DashboardTitleStyled>
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
                <UserSquareDivStyled />
                <div style={{ background: '#EBEBEB 0% 0% no-repeat padding-box' }}></div>
                <TextSelectStyled
                    onChange={changeLanguage}
                    value={selectedLanguage}
                >
                    <option>EN</option>
                    <option>ES</option>
                    <option>VA</option>
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
    align-items: center;
    gap: 2rem;
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

const UserSquareDivStyled = styled.div`
    border: 1px solid #EBEBEB;
    border-radius: 8px;
    font-family: 'Poppins', sans-serif;
    background-color: #C5C5C5;
    width: 4rem;
    height: 4rem;
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
    color: #E23428;
    &:focus {
        outline: none;
    }
`

export default Header;