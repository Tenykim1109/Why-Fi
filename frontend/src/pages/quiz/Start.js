import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import QuizButton from "./QuizButton";

const Start = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quiz");
  };
  const toHome = () => {
    navigate("/");
  };

  return (
    <DIV flex={true}>
      <Title>[ Quiz ]</Title>
      <Text>배운 내용을 복습해보아요.</Text>
      <Line />
      <div>
        <QuizButton onClick={startQuiz}>시작하기</QuizButton>
        <QuizButton onClick={toHome}>돌아가기</QuizButton>
      </div>
    </DIV>
  );
};

const DIV = styled.div`
  width: 400px;
  height: 100%;
  margin: auto;
  ${({ flex }) => {
    return flex
      ? `display: flex; flex-direction: column; justify-content: center; align-items: center;`
      : null;
  }}
`;

const Title = styled.h1`
  font-size: 4em;
  font-weight: bolder;
  margin: 0;
  user-select: none;
`;

const Line = styled.hr`
  width: 350px;
  border: 1px solid;
  margin-bottom: 2rem;
  ::focus {
    outline: none;
  }
`;

const Text = styled.p`
  font-weight: bold;
  font-size: 1.4rem;
`;

export default Start;