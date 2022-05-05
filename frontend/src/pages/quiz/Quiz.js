import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import OX from './OX';
import Choice from './Choice';
import Answer from './Answer';
import O_img from '../../components/event_img_o.png'
import X_img from '../../components/event_img_x.png'
import axios from 'axios';

const Quiz = () => {

  // 퀴즈 5개 랜덤하게 가져옴
  // 반복문으로 출력
  // QUIZ_TYPES = (
  //   ('ox', 'OX'),
  //   ('choices', '객관식'),
  // )
  // OX / 객관식에 따라서 다르게 출력
  // 사용자의 답을 누르면 정답/오답 여부 출력
  // 해설 출력
  
  // 다음 문제 넘어가기
  // 5문제 모두 다 풀었으면 몇 개 맞혔는지 result 페이지로 이동

  const navigate = useNavigate()
  // Quiz 인덱스
  const [idx, setIdx] = useState(0)
  // 현재 퀴즈 (인덱스 순으로 가져올 예정)
  const [currentQuiz, setCurrentQuiz] = useState({})
  // 맞힌 문제 수
  const [checkCorrect, setCheckCorrect] = useState(0)
  // 정답여부
  const [correct, setCorrect] = useState(false)

  // Quiz 샘플
  const quiz_sample = [
    {
      'id': '1',
      'quiz_type': 'choices',
      'question': '다음 중 어떠한 것의 정답은?',
      'answer': '222',
      'commentary': '111이거는 이거고, 저거는 저거고 그래서 정답은 그거입니다.',
      'choices_view1':'111',
      'choices_view2':'222',
      'choices_view3':'333',
      'choices_view4':'444',
    },
    {
      'id': '2',
      'quiz_type': 'ox',
      'question': '다음 중 어떠한 것의 정답은?',
      'answer': true,
      'commentary': '222이거는 이거고, 저거는 저거고 그래서 정답은 그거입니다.',
      'choices_view1':true,
      'choices_view2':false,
      'choices_view3':null,
      'choices_view4':null,
    },
    {
      'id': '3',
      'quiz_type': 'choices',
      'question': '다음 중 어떠한 것의 정답은?',
      'answer': '333',
      'commentary': '333이거는 이거고, 저거는 저거고 그래서 정답은 그거입니다.',
      'choices_view1':'111',
      'choices_view2':'222',
      'choices_view3':'333',
      'choices_view4':'444',
    },
    {
      'id': '4',
      'quiz_type': 'ox',
      'question': '다음 중 어떠한 것의 정답은?',
      'answer': true,
      'commentary': '444이거는 이거고, 저거는 저거고 그래서 정답은 그거입니다.',
      'choices_view1':true,
      'choices_view2':false,
      'choices_view3':null,
      'choices_view4':null,
    },
    {
      'id': '5',
      'quiz_type': 'choices',
      'question': '다음 중 어떠한 것의 정답은?',
      'answer': '444',
      'commentary': '555이거는 이거고, 저거는 저거고 그래서 정답은 그거입니다.',
      'choices_view1':'111',
      'choices_view2':'222',
      'choices_view3':'333',
      'choices_view4':'444',
    },
  ]

  const [quizData, setQuizData] = useState([])

  const getQuiz = async () => {
    await axios
    // 주소 설정
      .get('')
      .then((res) => {
        console.log(res.data)
        setQuizData(res.data)
      })
  }
  useEffect(() => {
    getQuiz();
  }, [])

  const checkAnswer = (answer) => {
    if (currentQuiz.answer === answer) {
      console.log('정답')
      setCheckCorrect(checkCorrect => checkCorrect + 1)
      setCorrect(true)
    }
    else {
      console.log('오답')
      console.log(currentQuiz.commentary)
      setCorrect(false)
    }
    setModalOpen((modalOpen) => !(modalOpen))
  }

  const addIndex = () => {
    if (idx >= 4)
      navigate('/quiz/result', { state: checkCorrect })
    else
      setIdx(idx => idx + 1)
    setModalOpen(false)
  }

  useEffect(() => {
    setCurrentQuiz(quiz_sample[idx])
  }, [idx])

  const [modalOpen, setModalOpen] = useState(false)
  console.log(modalOpen)
  // const handleModal = () => {
  //   setModalOpen((modalOpen) => !(modalOpen))
  // }

  return (
    <DIV flex={true}>
      <Title>
        {currentQuiz.quiz_type === 'ox' ? '[ OX 퀴즈 ]' : '[ 객관식 퀴즈 ]'}
      </Title>
      <Text>
        Q. {currentQuiz.question}
      </Text>
      <Line />

      {currentQuiz.quiz_type === 'ox' 
        ?
        <div>
          <OX onClick={() => checkAnswer(currentQuiz.choices_view1)} Color='#2ecc71'>O</OX>
          <OX onClick={() => checkAnswer(currentQuiz.choices_view2)} Color='#e74c3c'>X</OX>
        </div>
        :
        <>
          <Grid>
            <Flex onClick={() => checkAnswer(currentQuiz.choices_view1)}>
              <Choice>1</Choice>
              <Option>예금통장</Option>
            </Flex>
            <Flex onClick={() => checkAnswer(currentQuiz.choices_view2)}>
              <Choice>2</Choice>
              <Option>적금통장</Option>
            </Flex>
          </Grid>
          <Grid>
            <Flex onClick={() => checkAnswer(currentQuiz.choices_view3)}>
              <Choice>3</Choice>
              <Option>{currentQuiz.choices_view3}</Option>
            </Flex>
            <Flex onClick={() => checkAnswer(currentQuiz.choices_view4)}>
              <Choice>4</Choice>
              <Option>{currentQuiz.choices_view4}</Option>
            </Flex>
          </Grid>
        </>
      }
      <button onClick={addIndex}>idx test</button>
      {modalOpen && 
        <Answer toNextQuestion={addIndex}>
          {correct 
          ? 
          <>
            <Comment>정답입니다.</Comment>
            <img src={O_img} alt='O_img' />
          </>
          :
          <>
            <Comment>틀렸습니다.</Comment>
            <img src={X_img} alt='X_img' />
            <div>{currentQuiz.commentary}</div>
          </>
          }
          
        </Answer>
      }
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  & + & {
    margin-top: 1rem;
  }
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 200px;
  user-select: none;
  `

const Title = styled.h2`
  font-size: 3em;
  font-weight: bolder;
  margin: 0;
  user-select: none;
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

const Comment = styled.p`
  font-weight: bold;
  font-size: 1.4rem;
  margin: 0;
`

const Option = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 1rem;
  color: #0C4274;
`

export default Quiz;