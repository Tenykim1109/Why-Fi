import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Div from "./style/Div";

const ResetSuccess = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/");
  };

  return (
    <Div flex={true}>
      <Content>비밀번호를 재설정했어요.</Content>
      <Button onClick={toHome}>확인</Button>
    </Div>
  );
};

const Content = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

const Button = styled.button`
  display: block;
  width: 180px;
  height: 60px;

  background-color: #4cb5f5;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  border: 0px;
  border-radius: 8px;
  cursor: pointer;
`;

export default ResetSuccess;
