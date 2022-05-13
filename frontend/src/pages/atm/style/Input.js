import React from "react";
import styled from "styled-components";

const InputComponent = styled.input`
  // width: 100%;
  width: 340px;
  height: 40px;
  // margin: 0 10px;
  padding: 6px 12px;

  font-size: 1.2rem;
  text-align: center;

  border: 1px solid #a5a5a5;
  border-radius: 10px;
  outline: none;
  box-sizing: border-box;

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Input = ({ children, ...rest }) => {
  return <InputComponent {...rest}>{children}</InputComponent>;
};

export default Input;
