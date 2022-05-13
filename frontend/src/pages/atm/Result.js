import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import ConfirmBtn from "./style/ConfirmBtn";

const Result = () => {
  const { state } = useLocation();
  // console.log(state);
  const navigate = useNavigate();
  const toPassword = () => {
    navigate("/atm/password", { state: state });
  };

  const toHome = () => {
    navigate("/");
  };

  return (
    <div>
      {state ? (
        <>
          <h1>비밀번호를 다시 입력해주세요.</h1>
          <Div>
            <ConfirmBtn onClick={toPassword}>확인</ConfirmBtn>
          </Div>
        </>
      ) : (
        <>
          <h1>송금을 완료했어요.</h1>
          <Div>
            <ConfirmBtn onClick={toHome}>확인</ConfirmBtn>
          </Div>
        </>
      )}
    </div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Result;
