import React from "react";
import styled from "styled-components";
import VeryGoodImg from "./good.png";

const VeryGood = () => {
  return <IMG src={VeryGoodImg} alt="very_good" />;
};

const IMG = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
`;

export default VeryGood;
