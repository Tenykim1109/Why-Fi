import React, { useState } from "react";
import styled from "styled-components";

import Whale from "../../components/whale.png";
import WhaleSmile from "../../components/whale_smile.jpg";

import Container from "./style/Container";
import Title from "./style/Title";
import SubTitle from "./style/SubTitle";
import Describe from "./style/Describe";
import Bold from "./style/Bold";

const HelpDeposit = () => {
  const [page, setPage] = useState(1);

  const Prev = () => {
    setPage((page) => page - 1);
  };
  const Next = () => {
    setPage((page) => page + 1);
  };

  const deposit = {
    title: '"예금"이란?',
    what: '큰 돈을 한번에 맡겨 돈을 불리는 것을 말해요. \n정해진 기간 만큼 돈을 맡길 수 있고 돈을 맡기게 되면 "이자"라고 하는 것을 받을 수 있어요. \n이자는 "금리"라고 하는 이율이 커질 수록 커져요.',
    ordinay: "필요할 때 언제든지 돈을 맡기고 찾을 수 있는 저축을 의미해요.",
    fixedtime:
      "큰 돈을 한꺼번에 맡기고, 정해진 기간이 지난 다음에 약속한 이자와 함께 찾을 수 있는 저축을 의미해요.",
    expiration:
      "약속된 날까지 돈을 저금하게 되면 이자를 붙여서 돈을 돌려받게 되는데 그 날을 만기일이라고 해요.",
  };

  const Content = () => {
    if (page === 1) {
      return (
        <Container>
          <Title>{deposit.title}</Title>
          <Describe>
            큰 돈을 한번에 맡겨 돈을 불리는 것을 말해요.
            <br /> 정해진 기간 만큼 돈을 맡길 수 있고 돈을 맡기게 되면
            <Bold>이자</Bold>라고 하는 것을 받을 수 있어요.
            <br /> 이자는 <Bold>금리</Bold>라고 하는 이율이 커질 수록 커져요.
          </Describe>
        </Container>
      );
    } else if (page === 2) {
      return (
        <Container>
          <SubTitle>"보통예금"이란?</SubTitle>
          <Describe>{deposit.ordinay}</Describe>
        </Container>
      );
    } else if (page === 3) {
      return (
        <Container>
          <SubTitle>"정기예금"이란?</SubTitle>
          <Describe>{deposit.fixedtime}</Describe>
        </Container>
      );
    } else if (page === 4) {
      return (
        <Container>
          <SubTitle>"만기일"이란?</SubTitle>
          <Describe>{deposit.expiration}</Describe>
        </Container>
      );
    }
  };

  return (
    <div>
      <Content />
      <Flex>
        <Button disabled={page === 1} onClick={Prev}>
          이전
        </Button>
        {page % 2 === 1 ? (
          <IMG src={Whale} alt="whale" />
        ) : (
          <IMG src={WhaleSmile} alt="whale_smile" />
        )}
        <Button disabled={page === 4} onClick={Next}>
          다음
        </Button>
      </Flex>
    </div>
  );
};

const IMG = styled.img`
  width: 300px;
  height: 300px;
  margin: 0 auto;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

const Button = styled.button`
  width: 75px;
  height: 150px;
  font-weight: bold;
  border: none;

  background-color: #4cb5f5;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  border: 0px;
  border-radius: 8px;

  cursor: pointer;
  :disabled {
    background-color: gray;
  }
`;

export default HelpDeposit;
