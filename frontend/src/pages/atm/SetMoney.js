import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import Input from "./style/Input";
import Button from "./style/Button";
import ConfirmBtn from "./style/ConfirmBtn";
import Component1 from "./style/Component1";
import Component2 from "./style/Component2";
import axios from "axios";
import Password from "./Password";
import Transfer from "./Transfer";

import { Button as MUIButton } from "@mui/material";

const SetMoney = ({ accountNum }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // console.log(state);

  const [balance, setBalance] = useState("");
  const [money, setMoney] = useState("");
  const [moneyWithComma, setMoneyWithComma] = useState(0);

  // 숫자 입력 버튼
  const numpad = (num) => {
    setMoney((prev) => prev + num);
  };

  // 숫자 하나만 제거
  const deleteNum = () => {
    setMoney((prev) => prev.slice(0, -1));
  };

  // 숫자 전부 제거
  const clearNum = () => {
    setMoney("");
  };

  useEffect(() => {
    setMoneyWithComma(money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }, [money]);

  useEffect(() => {
    axios({
      url: `https://k6d108.p.ssafy.io/api/accounts/self/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        setBalance(res.data.balance);
        // 잔액 보다 많은 돈을 송금하려 할 때
        // if (money > res.data.balance) {
        //   navigate("/atm/moneycheck", {
        //     state: { booknum: state, balance: balance },
        //   });
        // } else {
        //   navigate("/atm/password", {
        //     state: { booknum: state, money: money },
        //   });
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 비밀번호 입력 화면으로
  const toPassword = () => {
    // if (money > 0)
    // navigate("/atm/password", { state: { booknum: state, money: money } });
    // moneyCheck();
  };

  // 계좌 번호 입력 화면으로
  const toTransfer = () => {
    navigate("/atm/transfer");
  };

  // // 잔액 확인
  // const moneyCheck = () => {
  //   axios({
  //     url: `https://k6d108.p.ssafy.io/api/accounts/self/`,
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("access-token")}`,
  //     },
  //   })
  //     .then((res) => {
  //       const balance = res.data.balance;
  //       // 잔액 보다 많은 돈을 송금하려 할 때
  //       if (money > res.data.balance) {
  //         navigate("/atm/moneycheck", {
  //           state: { booknum: state, balance: balance },
  //         });
  //       } else {
  //         navigate("/atm/password", {
  //           state: { booknum: state, money: money },
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const MoneyCheckBody = () => {
    let ui = "";
    const [step, setStep] = useState("");

    const toPassword = () => {
      console.log(balance);

      if (money > balance) {
        setStep("error");
      } else {
        setStep("front");
      }
    };

    const toTransfer = () => {
      // navigate("/atm/transfer");
      setStep("back");
    };

    switch (step) {
      case "front":
        ui = <Password accountNum={accountNum} money={money} />;
        break;
      case "back":
        ui = <Transfer />;
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
                잔액이 부족해요.
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
                  송금할 금액을 입력한 후
                  <br />
                  [확인]을 눌러주세요.
                </h1>
                <Input value={moneyWithComma + "원"} readOnly={true} />
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
              <ConfirmBtn onClick={toTransfer}>취소</ConfirmBtn>
              <ConfirmBtn onClick={toPassword}>확인</ConfirmBtn>
            </FlexConfirm>
          </>
        );
    }

    return ui;
  };

  return <MoneyCheckBody />;
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

export default SetMoney;
