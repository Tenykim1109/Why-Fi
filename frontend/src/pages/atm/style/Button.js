import React from "react";
import styled from "styled-components";

const BUTTON = styled.button`
  width: 80px;
  height: 60px;
  background-color: #4cb5f5;
  color: white;
  font-size: 1.7rem;
  font-weight: bold;
  border-radius: 8px;
  border: 2px solid white;
  cursor: pointer;
`;

const Button = ({ children, ...rest }) => {
  return <BUTTON {...rest}>{children}</BUTTON>;
};

export default Button;
