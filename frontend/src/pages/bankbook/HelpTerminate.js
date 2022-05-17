import React, { useState } from "react";
import styled from "styled-components";

import Whale from "../../components/whale.png";
import WhaleSmile from "../../components/whale_smile.jpg";

import Container from "./style/Container";
import Title from "./style/Title";
import SubTitle from "./style/SubTitle";
import Describe from "./style/Describe";
import Bold from "./style/Bold";

const HelpTerminate = () => {
  const [page, setPage] = useState(1);

  const Prev = () => {
    setPage((page) => page - 1);
  };
  const Next = () => {
    setPage((page) => page + 1);
  };

  const savings = {
    title: '"적금"이란?',
    what: "규칙적으로 작은 돈을 모아 큰 돈으로 만드는 것을 말해요.\n정해진 기간 동안 돈을 맡길 수 있고 돈을 맡기면 '이자'라고 하는 것을 받을 수 있어요. \n(이자는 '금리'라고 하는 이율이 커질 수록 커져요.) \n정해진 기간에 규칙적으로 입금하지 않으면 예상보다 적은 돈이 모이게 돼요. \n정해진 기간 전에 해지 한다면 이자를 받을 수 없게 돼요.",
    fixedtime:
      "매달 일정한 돈을 정해진 기간 동안 저금한 뒤, 약속한 이자를 받는 저축입니다.",
    expiration:
      "약속된 날까지 돈을 저금하게 되면 이자를 붙여서 돈을 돌려받게 되는데 그날을 만기일이라고 해요.",
  };

  const Content = () => {
    if (page === 1) {
      return (
        <Container>
          <Title>"해지"란?</Title>
          <Describe>
            정해진 기간보다 빨리 돈을 찾는 것을 <Bold>해지</Bold>라고 해요.
            해지를 하면 약속한 이자보다 훨씬 적은 이자를 받거나 <br />
            전혀 받지 못할 수도 있어요.
          </Describe>
        </Container>
      );
    } else if (page === 2) {
      return (
        <Container>
          <Describe>
            따라서 돈을 어떻게 사용할지 미리 계획을 세운 후에 <br />
            저축하는 지혜가 필요해요.
          </Describe>
        </Container>
      );
    }
  };

  return (
    <div>
      <Content />
      <Flex>
        <Button disabled={page === 1} onClick={Prev}>
          &lt; 이전
        </Button>
        {page % 2 === 1 ? (
          <IMG src={Whale} alt="whale" />
        ) : (
          <IMG src={WhaleSmile} alt="whale_smile" />
        )}
        <Button disabled={page === 2} onClick={Next}>
          다음 &gt;
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

export default HelpTerminate;
