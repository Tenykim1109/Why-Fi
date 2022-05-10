import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const SetMoney = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [money, setMoney] = useState("");

  const numpad = (num) => {
    // if (accountNum.length >= 10) {
    //   const numLimit = accountNum.substr(0, 10);
    //   setMoney(numLimit);
    // } else {
    //   setMoney((prev) => prev + num);
    // }
    setMoney((prev) => prev + num);
  };

  const deleteNum = () => {
    setMoney((prev) => prev.slice(0, -1));
  };

  const clearNum = () => {
    setMoney("");
  };

  const toPassword = () => {
    if (money > 0)
      navigate("/atm/password", { state: { booknum: state, money: money } });
  };

  const toTransfer = () => {
    navigate("/atm/transfer");
  };

  return (
    <>
      <FlexRow>
        <Component1>
          <h1>
            송금할 금액을 입력한 후
            <br />
            [확인]을 눌러주세요.
          </h1>
          <input value={money} readOnly={true} />
        </Component1>
        <Component2>
          <FlexRow>
            <Button onClick={() => numpad(1)}>1</Button>
            <Button onClick={() => numpad(2)}>2</Button>
            <Button onClick={() => numpad(3)}>3</Button>
          </FlexRow>
          <FlexRow>
            <Button onClick={() => numpad(4)}>4</Button>
            <Button onClick={() => numpad(5)}>5</Button>
            <Button onClick={() => numpad(6)}>6</Button>
          </FlexRow>
          <FlexRow>
            <Button onClick={() => numpad(7)}>7</Button>
            <Button onClick={() => numpad(8)}>8</Button>
            <Button onClick={() => numpad(9)}>9</Button>
          </FlexRow>
          <FlexRow>
            <Button onClick={deleteNum}>취소</Button>
            <Button onClick={() => numpad(0)}>0</Button>
            <Button onClick={clearNum}>정정</Button>
          </FlexRow>
        </Component2>
      </FlexRow>
      <div>
        <button onClick={toTransfer}>취소</button>
        <button onClick={toPassword}>확인</button>
      </div>
    </>
  );
};

const FlexRow = styled.div`
  display: flex;
  // width: 100%;
`;

const Component1 = styled.div`
  max-width: 60%;
`;
const Component2 = styled.div`
  max-width: 40%;
`;

const Button = styled.button`
  width: 80px;
  height: 60px;
  background-color: #4cb5f5;
  color: white;
  font-size: 1.7rem;
  font-weight: bold;
  border-radius: 8px;
  border: 2px solid white;
  cursor: pointer;
`;

export default SetMoney;
