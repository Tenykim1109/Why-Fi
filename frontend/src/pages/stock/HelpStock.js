import React, { useState } from "react";
import styled from "styled-components";

import Whale from "../../components/whale.png";
import WhaleSmile from "../../components/whale_smile.jpg";

const HelpStock = () => {
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
          <Title>"주식"이란?</Title>
          <Describe>
            예금이나 적금과 같은 저축이 아닌 <br /> <Bold>투자</Bold>의 한
            방법이에요. <br /> 원하는 회사의 주식을 사게 되면 <br /> 회사의{" "}
            주인인 <Bold>주주</Bold>가 돼요.
          </Describe>
        </Container>
      );
    } else if (page === 2) {
      return (
        <Container>
          <Describe>
            주식의 가격인 <Bold>주가</Bold>는 계속 바뀌고, 회사의 좋은 소식이나
            나쁜 소식에 따라 크게 바뀌기도 해요. <br />
            주식시장이 열려 있으면 자유롭게 사고 팔 수 있어요.
          </Describe>
        </Container>
      );
    } else if (page === 3) {
      return (
        <Container>
          <SubTitle>주식은 왜 생겼을까요?</SubTitle>
          <Describe>
            기업에서 여러 상품을 만들기 위해서는 돈이 필요해요. <br />
            여러 방법이 있지만, 회사의 여러 활동에 참여할 수 있는 권한을
            사람들에게 주고, 대가로 돈을 받는 방법이 주식이에요.
          </Describe>
        </Container>
      );
    } else if (page === 4) {
      return (
        <Container>
          <SubTitle>사람들은 왜 주식을 하나요?</SubTitle>
          <Describe>
            주식은 그날의 시장 상황에 따라서 가격이 오를 수도, 내릴 수도 있는{" "}
            <Bold>위험성</Bold>이 있어요. <br />
            하지만 주식이 올랐을 때의 이익이 일반적으로 예금과 적금으로 얻을 수
            있는 이익보다 크답니다.
          </Describe>
        </Container>
      );
    } else if (page === 5) {
      return (
        <Container>
          <Describe>
            <Bold>위험성</Bold>이 존재하기 떄문에 <Bold>신중</Bold>하게 생각한
            후에 사는 것이 좋아요.
          </Describe>
        </Container>
      );
    }
  };

  return (
    <DIV flex={true}>
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
          <Button disabled={page === 5} onClick={Next}>
            다음 &gt;
          </Button>
        </Flex>
      </div>
    </DIV>
  );
};

const DIV = styled.div`
  width: 500px;
  height: 95vh;
  @media (max-height: 720px) {
    min-height: 720px;
    // height: 100%;
  }
  margin: auto;
  ${({ flex }) => {
    return flex
      ? `display: flex; flex-direction: column; justify-content: center; align-items: center;`
      : null;
  }}
`;

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

const Bold = styled.div`
  display: inline;
  font-weight: bold;
`;

const Container = styled.div`
  box-sizing: border-box;
  width: 500px;
  border: 1px solid #4cb5f5;
  border-radius: 5px;
  padding: 10px;
  user-select: none;
`;

const Title = styled.p`
  font-size: 2.5rem;
  font-weight: bolder;
  text-align: center;
  margin: 10px 0;
  user-select: none;
`;

const SubTitle = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Describe = styled.p`
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  margin: 10px 0;
  white-space: pre-line;
`;

export default HelpStock;
