import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import Input from "./style/Input";
import ConfirmBtn from "./style/ConfirmBtn";

const NameConfirm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const toTransfer = () => {
    navigate("/atm/transfer");
  };

  const toSetMoney = () => {
    navigate("/atm/setmoney", { state: state });
  };

  return (
    <div>
      {state ? (
        // 유저 정보가 있을 때
        <>
          <h1>받는 사람을 확인해주세요.</h1>
          <Flex>
            <Text>계좌번호 </Text>
            <Input value={state.booknum} readOnly={true} />
          </Flex>
          <Flex>
            <Text>받는 사람</Text>
            <Input value={state.name} readOnly={true} />
          </Flex>
          <FlexConfirm>
            <ConfirmBtn onClick={toTransfer}>취소</ConfirmBtn>
            <ConfirmBtn onClick={toSetMoney}>확인</ConfirmBtn>
          </FlexConfirm>
        </>
      ) : (
        // 유저 정보가 없을 떄
        <>
          <h1>계좌번호를 확인해주세요.</h1>
          <Div>
            <ConfirmBtn onClick={toTransfer}>확인</ConfirmBtn>
          </Div>
        </>
      )}
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

const FlexConfirm = styled.div`
  display: flex;
  justify-content: space-between;
  width: 600px;
  margin-top: 1rem;
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

export default NameConfirm;
