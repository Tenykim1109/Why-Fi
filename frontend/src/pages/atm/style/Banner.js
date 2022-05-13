import React from "react";
import styled from "styled-components";

import LogoImg from "../../../components/why-fi_logo.png";

const Banner = () => {
  return (
    <>
      <Flex>
        <IMG src={LogoImg} alt="logo" />
      </Flex>
      <Line />
    </>
  );
};

const IMG = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

const Line = styled.hr`
  width: 90%;
  border: 1px solid #4cb5f5;
`;

export default Banner;
