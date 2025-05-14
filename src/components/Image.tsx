import React from "react";
import styled from "styled-components";

type ImageProps = {
  src: string;
};

const Image = ({ src }: ImageProps) => {
  return (
    <UserSquareDivStyled>
      <img
        src={src}
        alt="avatar"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          objectFit: "cover",
        }}
      />
    </UserSquareDivStyled>
  );
};

export default Image;

const UserSquareDivStyled = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 8px;
  background-color: #c5c5c5;
  width: 4rem;
  height: 4rem;
  overflow: hidden;
`;
