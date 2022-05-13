import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import Input from "./style/Input";
import ConfirmBtn from "./style/ConfirmBtn";

const MoneyCheck = () => {
  const { state } = useLocation();
  // console.log(state);
  const navigate = useNavigate();

  const toSetMoney = () => {
    navigate("/atm/setmoney", { state: state.booknum });
  };

  return (
    <div>
      <h1>잔액 보다 많은 금액을 보낼 수 없어요.</h1>
      <Flex>
        <Text>현재 잔액</Text>
        <Input value={state.balance} readOnly={true} />
      </Flex>
      <Div>
        <ConfirmBtn onClick={toSetMoney}>확인</ConfirmBtn>
      </Div>
    </div>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  ${({ margin }) => {
    return margin && `margin-bottom: 50px;`;
  }}
`;

const Text = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  width: 250px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default MoneyCheck;
