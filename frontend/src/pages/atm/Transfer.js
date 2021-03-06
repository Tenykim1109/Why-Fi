import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Input from "./style/Input";
import Button from "./style/Button";
import ConfirmBtn from "./style/ConfirmBtn";
import Component1 from "./style/Component1";
import Component2 from "./style/Component2";
import NameConfirm from "./NameConfirm";
import { useDispatch } from "react-redux";
import { Button as MUIButton } from "@mui/material";
import { closeATM, closeRemittance } from "../../modules/slices/modalSlice";

const Transfer = () => {
  // 통장 번호
  const [accountNum, setAccountNum] = useState("");
  const [state, setState] = useState("");
  let item = null;
  const dispatch = useDispatch();

  const numpad = (num) => {
    // 통장 번호 10자리
    if (accountNum.length >= 10) {
      const numLimit = accountNum.substr(0, 10);
      setAccountNum(numLimit);
    } else {
      setAccountNum((prev) => prev + num);
    }
  };

  // 숫자 하나만 제거
  const deleteNum = () => {
    setAccountNum((prev) => prev.slice(0, -1));
  };

  // 숫자 전부 제거
  const clearNum = () => {
    setAccountNum("");
  };

  const navigate = useNavigate();

  // 시작 화면 화면으로
  const toStart = () => {
    // navigate("/atm/start");
    dispatch(closeATM());
    dispatch(closeRemittance());
  };

  const TransferBody = () => {
    let ui = "";

    switch (state) {
      case "checking":
        ui = <NameConfirm state={item} accountNum={accountNum} />;
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
                올바르지 않은 계좌번호예요.
              </h2>
              <h2 style={{ textAlign: "center" }}>
                10자리의 계좌번호를 다시 입력해주세요!
              </h2>
            </div>
            <MUIButton
              variant="contained"
              sx={{
                background: "#4cb5f5",
                fontWeight: "Bold",
                mt: 4,
              }}
              onClick={() => {
                setState("");
              }}>
              돌아가기
            </MUIButton>
          </>
        );
        break;
      default:
        ui = (
          <>
            <Flex>
              <Component1>
                <H1>받는 사람의 계좌번호를 누르고 [확인]을 눌러주세요.</H1>
                <Input value={accountNum} readOnly={true} />
              </Component1>
              <Component2>
                <FlexBtn>
                  <Button onClick={() => numpad(1)}>1</Button>
                  <Button onClick={() => numpad(2)}>2</Button>
                  <Button onClick={() => numpad(3)}>3</Button>
                </FlexBtn>
                <FlexBtn>
                  <Button onClick={() => numpad(4)}>4</Button>
                  <Button onClick={() => numpad(5)}>5</Button>
                  <Button onClick={() => numpad(6)}>6</Button>
                </FlexBtn>
                <FlexBtn>
                  <Button onClick={() => numpad(7)}>7</Button>
                  <Button onClick={() => numpad(8)}>8</Button>
                  <Button onClick={() => numpad(9)}>9</Button>
                </FlexBtn>
                <FlexBtn>
                  <Button onClick={deleteNum}>
                    {String.fromCharCode(8592)}
                  </Button>
                  <Button onClick={() => numpad(0)}>0</Button>
                  <Button onClick={clearNum}>정정</Button>
                </FlexBtn>
              </Component2>
            </Flex>
            <FlexConfirm>
              <ConfirmBtn onClick={toStart}>취소</ConfirmBtn>
              <ConfirmBtn onClick={nameConfirm}>확인</ConfirmBtn>
            </FlexConfirm>
          </>
        );
    }

    return ui;
  };

  // 받을 사람 정보 가져오기
  const nameConfirm = () => {
    if (accountNum.length === 10) {
      setState("checking");
      // axios({
      //   method: "get",
      //   url: `https://k6d108.p.ssafy.io/api/accounts/bookcheck/${accountNum}/`,
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      //   },
      // })
      //   .then((res) => {
      //     console.log(res.data);
      //     const name = res.data[0];
      //     // 유저 정보가 존재하면 state로 같이 넘겨줌
      //     // navigate("/atm/nameconfirm", {
      //     //   state: { booknum: accountNum, name: name },
      //     // });
      //     // item = {
      //     //   booknum: accountNum,
      //     //   name: name,
      //     // };
      //     // setState("checking");
      //   })
      //   .catch((err) => {
      //     console.log(err.response.data);
      //     // 유저 정보가 없으면 그냥 이동
      //     // navigate("/atm/nameconfirm");
      //     // item = null;
      //     // setState("checking");
      //   });
    } else {
      setState("error");
    }
  };

  return (
    // <>
    //   <Flex>
    //     <Component1>
    //       <H1>받는 사람의 계좌번호를 누르고 [확인]을 눌러주세요.</H1>
    //       <Input value={accountNum} readOnly={true} />
    //     </Component1>
    //     <Component2>
    //       <FlexBtn>
    //         <Button onClick={() => numpad(1)}>1</Button>
    //         <Button onClick={() => numpad(2)}>2</Button>
    //         <Button onClick={() => numpad(3)}>3</Button>
    //       </FlexBtn>
    //       <FlexBtn>
    //         <Button onClick={() => numpad(4)}>4</Button>
    //         <Button onClick={() => numpad(5)}>5</Button>
    //         <Button onClick={() => numpad(6)}>6</Button>
    //       </FlexBtn>
    //       <FlexBtn>
    //         <Button onClick={() => numpad(7)}>7</Button>
    //         <Button onClick={() => numpad(8)}>8</Button>
    //         <Button onClick={() => numpad(9)}>9</Button>
    //       </FlexBtn>
    //       <FlexBtn>
    //         <Button onClick={deleteNum}>{String.fromCharCode(8592)}</Button>
    //         <Button onClick={() => numpad(0)}>0</Button>
    //         <Button onClick={clearNum}>정정</Button>
    //       </FlexBtn>
    //     </Component2>
    //   </Flex>
    //   <FlexConfirm>
    //     <ConfirmBtn onClick={toStart}>취소</ConfirmBtn>
    //     <ConfirmBtn onClick={nameConfirm}>확인</ConfirmBtn>
    //   </FlexConfirm>
    // </>
    <TransferBody />
  );
};

const Flex = styled.div`
  display: flex;
  width: 600px;
  justify-content: space-between;
`;

const FlexBtn = styled.div`
  display: flex;
  // width: 100%;
  justify-content: space-between;
`;

const FlexConfirm = styled.div`
  display: flex;
  justify-content: space-between;
  width: 600px;
  margin-top: 1rem;
`;

const H1 = styled.h1`
  // margin: 0 10px;
  margin-bottom: 1rem;
`;

export default Transfer;
