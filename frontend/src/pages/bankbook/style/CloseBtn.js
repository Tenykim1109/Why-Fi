import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  display: block;
  width: 60px;
  height: 60px;

  background-color: #4cb5f5;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: 0px;
  border-radius: 8px;
  cursor: pointer;
`;

const CloseBtn = ({ children, ...rest }) => {
  return <Btn {...rest}>{children}</Btn>;
};

export default CloseBtn;
