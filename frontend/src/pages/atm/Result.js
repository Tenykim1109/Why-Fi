import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { closeATM, closeRemittance } from "../../modules/slices/modalSlice";

import ConfirmBtn from "./style/ConfirmBtn";

const Result = () => {
  const { state } = useLocation();
  // console.log(state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toPassword = () => {
    navigate("/atm/password", { state: state });
  };

  const toHome = () => {
    // navigate("/");
    dispatch(closeRemittance());
    dispatch(closeATM());
  };

  return (
    <div>
      {state ? (
        <>
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
          <h1>비밀번호를 다시 입력해주세요.</h1>
          <Div>
            <ConfirmBtn onClick={toPassword}>확인</ConfirmBtn>
          </Div>
        </>
      ) : (
        <>
          <div
            style={{
              textAlign: "center",
            }}>
            <img
              src="assets/mascot/dolphin_happy_blue.png"
              alt="assets/mascot/dolphin_happy_blue.png"
              style={{
                width: "300px",
                objectFit: "cover",
              }}
            />
          </div>
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
