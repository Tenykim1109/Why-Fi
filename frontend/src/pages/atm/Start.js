import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  const toTransfer = () => {
    navigate("/atm/transfer");
  };

  const toHome = () => {
    navigate("/ingame");
  };

  return (
    <div>
      <Button onClick={toTransfer}>송금하기</Button>
      <Button onClick={toHome}>돌아가기</Button>
    </div>
  );
};

const Button = styled.button`
  display: block;
  width: 200px;
  height: 80px;
  background-color: #4cb5f5;
  border-radius: 8px;
  border: none;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;

  & + & {
    margin-top: 1rem;
  }
`;

export default Start;
