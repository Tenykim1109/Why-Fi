import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Password = () => {
  const { state } = useLocation();
  // console.log(state);

  const [password, setPassword] = useState("");

  const numpad = (num) => {
    if (password.length >= 4) {
      const pwLimit = password.substr(0, 4);
      setPassword(pwLimit);
    } else {
      setPassword((prev) => prev + num);
    }
  };

  const deleteNum = () => {
    setPassword((prev) => prev.slice(0, -1));
  };

  const clearNum = () => {
    setPassword("");
  };

  const navigate = useNavigate();
  const toSetMoney = () => {
    navigate("/atm/setmoney", { state: state.booknum });
  };

  // 페이지 이동 임시 테스트
  const toResult = () => {
    navigate("/atm/result", { state: state });
  };

  // 송금 기능
  const remittance = () => {
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/accounts/remittance/",
      header: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      data: {
        book_number: state.booknum,
        book_password: password,
        money: state.money,
      },
    })
      .then((res) => {
        console.log(res.data);
        navigate("/atm/result");
      })
      .catch((err) => {
        console.log(err.response.data);
        navigate("/atm/result", { state: state });
      });
  };

  return (
    <>
      <FlexRow>
        <Component1>
          <h1>
            비밀번호 4자리를 누르고
            <br />
            [확인]을 눌러주세요.
          </h1>
          <form>
            <input
              type="password"
              value={password}
              readOnly={true}
              autoComplete="on"
            />
          </form>
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
        <button onClick={toSetMoney}>취소</button>
        <button onClick={toResult}>확인</button>
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

export default Password;
