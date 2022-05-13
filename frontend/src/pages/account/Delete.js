import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Div from "../bankbook/style/Div";
import AccountInput from "./style/AccountInput";

const Delete = () => {
  const navigate = useNavigate();

  const deleteAccount = async () => {
    await axios({
      url: "http://127.0.0.1:8000/api/accounts/delete/",
      method: "delete",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      data: {
        username: localStorage.getItem("username"),
        password: pw,
      },
    })
      .then((res) => {
        console.log(res.data);
        navigate("/mypage/delete/success");
      })
      .catch((err) => {
        // console.log(err.response.data);
        // if (err.response.data === "error: 본인 인증 실패")
        alert("비밀번호가 틀렸어요.");
      });
  };

  const toMypage = () => {
    navigate("/mypage");
  };

  const [pw, setPw] = useState("");
  const pwHandle = (event) => {
    const pwInput = event.target.value;
    setPw(pwInput);
  };

  const [deleteCheck, setDeleteCheck] = useState(false);
  const sureToDelete = () => {
    setDeleteCheck((deleteCheck) => !deleteCheck);
  };
  // console.log(deleteCheck);

  return (
    <Div flex={true}>
      {deleteCheck ? (
        <>
          <Content>비밀번호를 입력해주세요.</Content>
          <AccountInput
            type="password"
            name="password_input"
            value={pw}
            onChange={pwHandle}
            placeholder="비밀번호"
            autoComplete="on"
          />
          <Flex>
            <Yes onClick={deleteAccount}>탈퇴하기</Yes>
            <No onClick={toMypage}>돌아가기</No>
          </Flex>
        </>
      ) : (
        <>
          <Content>정말로 탈퇴하시겠어요?</Content>
          <Flex>
            <Yes onClick={sureToDelete}>예</Yes>
            <No onClick={toMypage}>아니요</No>
          </Flex>
        </>
      )}
    </Div>
  );
};

const Flex = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const Content = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

const No = styled.button`
  width: 180px;
  height: 60px;

  background-color: #4cb5f5;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  border: 0px;
  border-radius: 8px;
  margin: 0 30px;
  cursor: pointer;
`;

const Yes = styled.button`
  width: 180px;
  height: 60px;

  background-color: #e74c3c;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  border: 0px;
  border-radius: 8px;
  margin: 0 30px;
  cursor: pointer;
`;

export default Delete;
