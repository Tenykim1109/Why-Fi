import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Div from "../bankbook/Div";
import Title from "../bankbook/Title";
import SubTitle from "../bankbook/SubTitle";
// import Describe from "../bankbook/Describe";

const Mypage = () => {
  const [userData, setUserData] = useState();
  // const user = localStorage.getItem("username");

  const getUserData = () => {
    axios({
      url: `http://127.0.0.1:8000/api/accounts/self/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const navigate = useNavigate();

  const toDelete = () => {
    navigate("/mypage/delete");
  };

  return (
    <Div flex={true}>
      <Title>{userData && userData.username}님의 통장</Title>
      <SubTitle>계좌번호 : {userData && userData.book_number}</SubTitle>
      <SubTitle>잔액 : {userData && userData.balance}원</SubTitle>
      <UL>
        <SubTitle>자산 현황</SubTitle>
        <OL>예금 : </OL>
        <OL>적금 : </OL>

        <SubTitle>주식 현황</SubTitle>
        <OL>A : </OL>
        <OL>B : </OL>
        <OL>총 : </OL>
      </UL>
      <Button onClick={toDelete}>탈퇴하기</Button>
    </Div>
  );
};

const UL = styled.ul`
  padding: 0;
  margin: 0;
  margin-bottom: 1rem;
`;

const OL = styled.ol`
  font-size: 1.2rem;
  padding: 0;
`;

const Button = styled.button`
  width: 180px;
  height: 60px;
  font-weight: bold;
  border: none;

  background-color: #e74c3c;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  border: 0px;
  border-radius: 8px;
  cursor: pointer;
`;

export default Mypage;
