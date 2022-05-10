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

  const getUserData = () => {
    axios({
      url: "",
      method: "post",
      headers: {
        // "Authorization": `Bearer `
      },
    })
      .then((res) => {
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
      <Title>님의 통장</Title>
      <SubTitle>계좌번호 : </SubTitle>
      <SubTitle>잔액 : </SubTitle>
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
