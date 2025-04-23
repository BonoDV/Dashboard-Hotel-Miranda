import React from 'react';
import styled from 'styled-components';

import { IconContext } from "react-icons";
import { FaArrowLeft as ArrowLeftIcon } from "react-icons/fa";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { FaHeart as HeartIcon, FaBell as BellIcon } from "react-icons/fa";
import { MdEmail as EmailIcon } from "react-icons/md";
import { LuMessageSquare as MessageIcon } from "react-icons/lu";

const Header = () => {
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
            </RightSection>
        </HeaderStyled>
    );
};

const HeaderStyled = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 30rem;
    padding: 3rem;
    position: relative; /* Para el posicionamiento del UserSquareDivStyled */
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

export default Header;