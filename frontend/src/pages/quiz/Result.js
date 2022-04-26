import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import axios from 'axios';

import QuizButton from './QuizButton';
import VeryGood from '../../components/VeryGood';

const Result = () => {

  const navigate = useNavigate()
  const [correct, setCorrect] = useState(0)
  console.log(setCorrect)

  const startQuiz = () => {
    navigate('/quiz/start')
  }
  const toHome = () => {
    navigate('/')
  }

  return (
    <DIV flex={true}>
      <VeryGood />
      <Text>
        5문제 중 {correct}문제 맞았습니다.
      </Text>
      <Line />
      <div>
        <QuizButton onClick={startQuiz}>다시하기</QuizButton>
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
    return flex ? 
      `display: flex; flex-direction: column; justify-content: center; align-items: center;` 
      : null;
  }}
`

const Line = styled.hr`
  width: 350px;
  border: 1px solid;
  margin-bottom: 2rem;
  ::focus {
    outline: none;
}
`

const Text = styled.p`
  font-weight: bold;
  font-size: 1.4rem;
`


export default Result;