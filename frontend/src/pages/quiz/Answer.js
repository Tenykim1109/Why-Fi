import React from "react";
import styled from "styled-components";

import QuizButton from "./style/QuizButton";

const Answer = ({ toNextQuestion, children, ...rest }) => {
  return (
    <Container>
      {/* <Background onClick={_handleModal} /> */}
      <Background />
      <ModalBlock {...rest}>
        <Contents>{children}</Contents>
        <QuizButton
          style={{ fontSize: "1.2rem", float: "right", marginTop: "1rem" }}
          onClick={toNextQuestion}>
          다음 문제 풀기
        </QuizButton>
      </ModalBlock>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.35);
  user-select: none;
`;

const ModalBlock = styled.div`
  position: absolute;

  border-radius: 10px;
  padding: 1.5rem;
  background-color: white;
  width: 400px;
  min-height: 400px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Answer;
