import React from 'react';
import styled from 'styled-components';

const Image = () => {
    return (
        <div>
            <UserSquareDivStyled/>
        </div>
    );
};

export default Image;

const UserSquareDivStyled = styled.div`
    border: 1px solid #EBEBEB;
    border-radius: 8px;
    font-family: 'Poppins', sans-serif;
    background-color: #C5C5C5;
    width: 4rem;
    height: 4rem;
`;