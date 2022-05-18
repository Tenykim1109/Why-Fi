import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import QuizButton from "./style/QuizButton";
import Div from "../bankbook/style/Div";
import Quiz from "./Quiz";

const Start = () => {
  const [state, setState] = useState("");
  const navigate = useNavigate();

  const startQuiz = () => {
    // navigate("/quiz");
    setState("start");
  };
  const toHome = () => {
    // navigate("/");
    // ingame에서는 ingame으로 돌아가도록
    // navigate("/ingame");
  };

  return (
    <>
      {state === "start" ? (
        <Quiz />
      ) : (
        <Div flex={true}>
          <Title>[ Quiz ]</Title>
          <Text>배운 내용을 복습해보아요.</Text>
          <Line />
          <div>
            <QuizButton onClick={startQuiz}>시작하기</QuizButton>
            <QuizButton onClick={toHome}>돌아가기</QuizButton>
          </div>
        </Div>
      )}
    </>
  );
};

// const DIV = styled.div`
//   width: 400px;
//   height: 95vh;
//   @media (max-height: 720px) {
//     min-height: 720px;
//     // height: 100%;
//   }
//   margin: auto;
//   ${({ flex }) => {
//     return flex
//       ? `display: flex; flex-direction: column; justify-content: center; align-items: center;`
//       : null;
//   }}
// `;

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
