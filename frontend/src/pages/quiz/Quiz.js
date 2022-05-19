import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import OX from "./style/OX";
import Choice from "./style/Choice";
import Answer from "./Answer";
import O_img from "../../components/event_img_o.png";
import X_img from "../../components/event_img_x.png";
import Div from "../bankbook/style/Div";
import axios from "axios";
import Result from "./Result";

const Quiz = () => {
  // const navigate = useNavigate();

  // Quiz 인덱스
  const [idx, setIdx] = useState(0);
  // 현재 퀴즈 (인덱스 순으로 가져올 예정)
  const [currentQuiz, setCurrentQuiz] = useState({});
  // 맞힌 문제 수
  const [checkCorrect, setCheckCorrect] = useState(0);
  // 정답여부
  const [correct, setCorrect] = useState(false);

  const [quizData, setQuizData] = useState([]);
  const [result, setResult] = useState(false);
  // console.log(result);

  useEffect(() => {
    const getQuiz = async () => {
      await axios({
        url: "https://k6d108.p.ssafy.io/api/quiz/",
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }).then((res) => {
        // console.log(res.data);
        setQuizData(res.data);
      });
    };
    getQuiz();
  }, [result]);

  // 정답 체크
  const checkAnswer = (answer) => {
    // console.log("퀴즈 답", currentQuiz.answer);
    // console.log("내가 고른 답", answer);
    if (currentQuiz.answer === answer) {
      // console.log("정답");
      setCheckCorrect((checkCorrect) => checkCorrect + 1);
      setCorrect(true);
    } else {
      // console.log("오답");
      // console.log(currentQuiz.commentary);
      setCorrect(false);
    }
    setModalOpen((modalOpen) => !modalOpen);
  };

  const addIndex = () => {
    // if (idx >= 4) navigate("/quiz/result", { state: checkCorrect });
    if (idx >= 4) setResult(true);
    else setIdx((idx) => idx + 1);
    setModalOpen(false);
  };

  useEffect(() => {
    setCurrentQuiz(quizData[idx]);
  }, [quizData, idx]);

  const [modalOpen, setModalOpen] = useState(false);
  // console.log(modalOpen);
  // const handleModal = () => {
  //   setModalOpen((modalOpen) => !(modalOpen));
  // };

  return (
    <>
      {!result ? (
        <Div flex={true}>
          {currentQuiz && (
            <>
              <Title>
                {currentQuiz.quiz_type === "ox"
                  ? "[ OX 퀴즈 ]"
                  : "[ 객관식 퀴즈 ]"}
              </Title>
              <Text>Q. {currentQuiz.question}</Text>
              <Line />

              {currentQuiz.quiz_type === "ox" ? (
                <div>
                  <OX onClick={() => checkAnswer("O")} Color="#2ecc71">
                    O
                  </OX>
                  <OX onClick={() => checkAnswer("X")} Color="#e74c3c">
                    X
                  </OX>
                </div>
              ) : (
                <>
                  <Grid>
                    <Flex onClick={() => checkAnswer("1")}>
                      <Choice>1</Choice>
                      <Option>{currentQuiz.choices_view1}</Option>
                    </Flex>
                    <Flex onClick={() => checkAnswer("2")}>
                      <Choice>2</Choice>
                      <Option>{currentQuiz.choices_view2}</Option>
                    </Flex>
                  </Grid>
                  <Grid>
                    <Flex onClick={() => checkAnswer("3")}>
                      <Choice>3</Choice>
                      <Option>{currentQuiz.choices_view3}</Option>
                    </Flex>
                    <Flex onClick={() => checkAnswer("4")}>
                      <Choice>4</Choice>
                      <Option>{currentQuiz.choices_view4}</Option>
                    </Flex>
                  </Grid>
                </>
              )}
              {modalOpen && (
                <Answer toNextQuestion={addIndex}>
                  {correct ? (
                    <>
                      <Comment>정답입니다.</Comment>
                      <img src={O_img} alt="O_img" />
                      <div>{currentQuiz.commentary}</div>
                    </>
                  ) : (
                    <>
                      <Comment>틀렸습니다.</Comment>
                      <img src={X_img} alt="X_img" />
                      <div>{currentQuiz.commentary}</div>
                    </>
                  )}
                </Answer>
              )}
            </>
          )}
        </Div>
      ) : (
        <Result
          checkCorrect={checkCorrect}
          show={result}
          setShow={setResult}
          setIdx={setIdx}
          setCheckCorrect={setCheckCorrect}
        />
      )}
    </>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  & + & {
    margin-top: 1rem;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 300px;
  user-select: none;
`;

const Title = styled.h2`
  font-size: 3em;
  font-weight: bolder;
  margin: 0;
  user-select: none;
`;

const Line = styled.hr`
  width: 500px;
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

const Comment = styled.p`
  font-weight: bold;
  font-size: 1.4rem;
  margin: 0;
`;

const Option = styled.p`
  width: 240px;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 1rem;
  color: #0c4274;
`;

export default Quiz;
