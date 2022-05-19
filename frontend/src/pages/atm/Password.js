import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Input from "./style/Input";
import Button from "./style/Button";
import ConfirmBtn from "./style/ConfirmBtn";
import Component1 from "./style/Component1";
import Component2 from "./style/Component2";
import SetMoney from "./SetMoney";

import { Button as MUIButton } from "@mui/material";
import Result from "./Result";

const Password = ({ accountNum, money }) => {
  const { state } = useLocation();
  console.log(state);

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

  // 송금
  const remittanceMoney = () => {
    axios({
      method: "post",
      url: "https://k6d108.p.ssafy.io/api/accounts/remittance/",
      data: {
        book_number: accountNum,
        book_password: password,
        money: Number(money),
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        // navigate("/atm/result");
      })
      .catch((err) => {
        console.log(err.response.data);
        // navigate("/atm/result", { state: state });
      });
  };

  const PasswordBody = () => {
    const [step, setStep] = useState("");
    let ui = "";

    // 송금
    const remittanceMoney = () => {
      axios({
        method: "post",
        url: "https://k6d108.p.ssafy.io/api/accounts/remittance/",
        data: {
          book_number: accountNum,
          book_password: password,
          money: Number(money),
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          setStep("front");
          // navigate("/atm/result");
        })
        .catch((err) => {
          console.log(err.response.data);
          setStep("error");
          // navigate("/atm/result", { state: state });
        });
    };

    const toSetMoney = () => {
      setStep("back");
    };

    switch (step) {
      case "front":
        ui = <Result />;
        break;
      case "back":
        ui = <SetMoney accountNum={accountNum} />;
        break;
      case "error":
        ui = (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center",
              }}>
              <div
                style={{
                  textAlign: "center",
                }}>
                <img
                  src="assets/mascot/dolphin_sad_blue.png"
                  alt="assets/mascot/dolphin_sad_blue.png"
                  style={{
                    width: "300px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <h2
                style={{
                  textAlign: "center",
                }}>
                비밀번호가 맞지 않아요.
              </h2>
              <h2 style={{ textAlign: "center" }}>다시 시도해주세요!</h2>
              <MUIButton
                variant="contained"
                sx={{
                  background: "#4cb5f5",
                  fontWeight: "Bold",
                  mt: 4,
                }}
                onClick={() => {
                  setStep("");
                }}>
                돌아가기
              </MUIButton>
            </div>
          </>
        );
        break;
      default:
        ui = (
          <>
            <FlexRow>
              <Component1>
                <h1>
                  비밀번호 4자리를 누르고
                  <br />
                  [확인]을 눌러주세요.
                </h1>
                <form>
                  <Input
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
            <FlexConfirm>
              <ConfirmBtn onClick={toSetMoney}>취소</ConfirmBtn>
              <ConfirmBtn onClick={remittanceMoney}>확인</ConfirmBtn>
            </FlexConfirm>
          </>
        );
    }

    return ui;
  };

  return <PasswordBody />;
};

const FlexRow = styled.div`
  display: flex;
  // width: 100%;
`;

const FlexConfirm = styled.div`
  display: flex;
  justify-content: space-between;
  width: 600px;
  margin-top: 1rem;
`;

export default Password;
