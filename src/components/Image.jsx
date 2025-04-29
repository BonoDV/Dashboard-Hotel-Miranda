// Image.jsx
import React from 'react';
import styled from 'styled-components';

const Image = ({ src }) => {
    return (
        <UserSquareDivStyled>
            <img src={src} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }} />
        </UserSquareDivStyled>
    );
};

export default Image;

const UserSquareDivStyled = styled.div`
    border: 1px solid #EBEBEB;
    border-radius: 8px;
    background-color: #C5C5C5;
    width: 4rem;
    height: 4rem;
    overflow: hidden;
`;
