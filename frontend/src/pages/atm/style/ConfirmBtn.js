import React from "react";
import styled from "styled-components";

const Confirm = styled.button`
  width: 120px;
  height: 60px;
  background-color: #4cb5f5;
  color: white;
  border: 0;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const ConfirmBtn = ({ children, ...rest }) => {
  return <Confirm {...rest}>{children}</Confirm>;
};

export default ConfirmBtn;
