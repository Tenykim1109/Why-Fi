import React, {
  // useState 
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import QuizButton from './QuizButton';
// import VeryGood from '../../components/VeryGood';
import Whale from '../../components/whale.png'
import WhaleSmile from '../../components/whale_smile.jpg'
import WhaleCry from '../../components/whale_cry.jpg'

const Result = () => {

  const navigate = useNavigate()
  const { state } = useLocation()
  // console.log('state', state)
  // const [correct, setCorrect] = useState(0)
  // console.log(setCorrect)

  const ReturnImg = () => {
    if (state >= 4) {
      return (
        <IMG src={WhaleSmile} alt='whale_smile' />
      )
    }
    else if (state >= 2) {
      return (
        <IMG src={Whale} alt='whale' />
      )
    }
    else {
      return (
        <IMG src={WhaleCry} alt='whale_cry' />
      )
    }
  }
  console.log(ReturnImg)

  const startQuiz = () => {
    navigate("/quiz/start");
  };
  const toHome = () => {
    navigate("/");
  };

  return (
    <DIV flex={true}>
      {/* <VeryGood /> */}
      <ReturnImg />
      <Text>
        5문제 중 {state}문제 맞혔어요.
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
    return flex
      ? `display: flex; flex-direction: column; justify-content: center; align-items: center;`
      : null;
  }}
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
  margin-top: 0;
`

const IMG = styled.img`
  width: 200px;
  height: 200px;
`

export default Result;
