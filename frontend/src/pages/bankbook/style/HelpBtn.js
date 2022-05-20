import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  width: 90px;
  height: 60px;
  margin-left: auto;
  margin-right: 0;
  // margin-bottom: 20px;

  background-color: #4cb5f5;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: 0px;
  border-radius: 8px;
  cursor: pointer;
`;

const HelpBtn = ({ children, ...rest }) => {
  return <Btn {...rest}>{children}</Btn>;
};

export default HelpBtn;
