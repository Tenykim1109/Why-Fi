import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  width: 200px;
  height: 80px;
  background-color: #4cb5f5;
  border-radius: 8px;
  border: none;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
`;

const Start = () => {
  const navigate = useNavigate();
  const toTransfer = () => {
    navigate("/atm/transfer");
  };

  return <Button onClick={toTransfer}>송금하기</Button>;
};

export default Start;
