import React, { useState } from "react";
import styled from "styled-components";

import Whale from "../../components/whale.png";
import WhaleSmile from "../../components/whale_smile.jpg";

import Container from "../bankbook/style/Container";
import Title from "../bankbook/style/Title";
import Describe from "../bankbook/style/Describe";
import Bold from "../bankbook/style/Bold";

const HelpAtm = () => {
  const [page, setPage] = useState(1);

  const Prev = () => {
    setPage((page) => page - 1);
  };
  const Next = () => {
    setPage((page) => page + 1);
  };
  const Content = () => {
    if (page === 1) {
      return (
        <Container>
          <Title>"ATM"이란?</Title>
          <Describe>
            <Bold>ATM</Bold>은 현금자동인출기로 은행 창구에 가지 않아도 돈을
            맡기거나 찾을 수 있게 해주는 기계에요.
          </Describe>
        </Container>
      );
    } else if (page === 2) {
      return (
        <Container>
          <Describe>
            은행 운영시간이 아니더라도 ATM을 통해서 은행 일의 일부를 대신 처리할
            수 있어요.
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
          이전
        </Button>
        {page % 2 === 1 ? (
          <IMG src={Whale} alt="whale" />
        ) : (
          <IMG src={WhaleSmile} alt="whale_smile" />
        )}
        <Button disabled={page === 2} onClick={Next}>
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
export default HelpAtm;
