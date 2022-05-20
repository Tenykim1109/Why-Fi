import React from "react";
import { useState } from "react";
import styled from "styled-components";

import Whale from "../../components/whale.png";
import WhaleSmile from "../../components/whale_smile.jpg";

import Container from "./style/Container";
import Title from "./style/Title";
import SubTitle from "./style/SubTitle";
import Describe from "./style/Describe";
import Bold from "./style/Bold";

const HelpBankbook = (props) => {
  console.log("props", props);
  const [page, setPage] = useState(1);
  // const [nameError, setNameError] = useState(0)
  // console.log(nameError)

  const Prev = () => {
    // props.setPage((page) => page - 1);
    setPage((page) => page - 1);
  };
  const Next = () => {
    // props.setPage((page) => page + 1);
    setPage((page) => page + 1);
  };

  const boldtext = ["신분증", "주민등록등본", "도장", "가입신청서", "네 자리"];

  const Content = () => {
    if (page === 1) {
      return (
        <Container>
          <Title>"통장"이란?</Title>
          <Describe>
            통장은 금융거래를 할 때의 거래 내역을 기록한 문서를 말해요.
          </Describe>
        </Container>
      );
    } else if (page === 2) {
      return (
        <Container>
          <SubTitle>통장을 만들기 위해서는?</SubTitle>
          <Describe>
            부모님의 <Bold>{boldtext[0]}</Bold>과 <Bold>{boldtext[1]}</Bold>,
            <Bold>{boldtext[2]}</Bold> <br />
            (내 도장이나 부모님 도장)이 필요해요.
          </Describe>
        </Container>
      );
    } else if (page === 3) {
      return (
        <Container>
          <SubTitle>통장을 만들기 위해서는?</SubTitle>
          <Describe>
            부모님과 함께 은행에 가서 <Bold>{boldtext[3]}</Bold>를 작성해요.
            <br />
            (이름, 주소, 주민등록번호)
          </Describe>
        </Container>
      );
    } else if (page === 4) {
      return (
        <Container>
          <SubTitle>통장을 만들기 위해서는?</SubTitle>
          <Describe>
            사용할 비밀번호 <Bold>{boldtext[4]}</Bold>를 입력해요.
            <br />이 때 비밀번호는 연속된 숫자나 생년월일 처럼 쉬운 숫자는
            피해야 해요.
          </Describe>
        </Container>
      );
    } else if (page === 5) {
      return (
        <Container>
          <SubTitle>계좌번호란?</SubTitle>
          <Describe>계좌의 고유 번호를 계좌번호라고 말해요.</Describe>
        </Container>
      );
    } else if (page === 6) {
      return (
        <Container>
          <Describe>
            계좌 번호는 은행의 통장을 발급받을 때 부여 받을 수 있어요.
          </Describe>
        </Container>
      );
    } else if (page === 7) {
      return (
        <Container>
          <Describe>
            계좌번호를 알고 있으면 상대방에게 돈을 보낼 수 있어요.
          </Describe>
        </Container>
      );
    } else if (page === 8) {
      if (props.setClose) {
        props.setClose(true);
      }
      return (
        <Container>
          <SubTitle>이제 통장을 만들어 볼까요?</SubTitle>
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
        {/* <Button disabled={page === 8} onClick={Next}> */}
        <Button
          disabled={props.setClose ? page === 8 : page === 7}
          onClick={Next}>
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
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
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

export default HelpBankbook;
