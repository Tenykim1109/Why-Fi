import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Transfer from "./Transfer";
import Div from "./style/Div";

const Start = () => {
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const toTransfer = () => {
    setState("start");
  };

  const toHome = () => {
    navigate("/ingame");
  };

  return (
    <>
      {state === "start" ? (
        <Div flex={true}>
          <Transfer />
        </Div>
      ) : (
        <Div flex={true}>
          <div>
            <Button onClick={toTransfer}>송금하기</Button>
            <Button onClick={toHome}>돌아가기</Button>
          </div>
        </Div>
      )}
    </>
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
