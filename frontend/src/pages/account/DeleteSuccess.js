import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DeleteSuccess = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/");
  };

  return (
    <DIV flex={true}>
      <Content>회원탈퇴가 완료되었어요.</Content>
      <Button onClick={toHome}>확인</Button>
    </DIV>
  );
};

const DIV = styled.div`
  width: 500px;
  height: 100%;
  margin: auto;
  ${({ flex }) => {
    return flex
      ? `display: flex; flex-direction: column; justify-content: center; align-items: center;`
      : null;
  }}
`;

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

export default DeleteSuccess;
