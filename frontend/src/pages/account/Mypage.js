import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// import Div from "../bankbook/style/Div";
// import Title from "../bankbook/style/Title";
import SubTitle from "../bankbook/style/SubTitle";

const Mypage = () => {
  const [userData, setUserData] = useState();
  // const user = localStorage.getItem("username");
  const [totalBalance, setTotalBalance] = useState(0);
  // console.log(totalBalance);

  const getUserData = () => {
    axios({
      url: `http://127.0.0.1:8000/api/accounts/self/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        setUserData(res.data);
        setTotalBalance(
          res.data.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [bankbookData, setBankbookData] = useState();
  console.log(bankbookData);

  const getBankbookData = () => {
    axios({
      url: `http://127.0.0.1:8000/api/bankbooks/booklist/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        // console.log("bankbook data", res.data);
        setBankbookData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserData();
    getBankbookData();
  }, []);

  const type = {
    deposit: "예금",
    savings: "적금",
  };

  const navigate = useNavigate();

  const toDelete = () => {
    navigate("/mypage/delete");
  };

  return (
    <Div>
      <Flex>
        {/* <Title>{userData && userData.username}님의 통장</Title> */}
        <Title>{userData && userData.username}</Title>
        <Title2>님의 통장</Title2>
      </Flex>
      <SubTitle>계좌번호 : {userData && userData.book_number}</SubTitle>
      <SubTitle>잔액 : {userData && totalBalance}원</SubTitle>

      <Border>
        <SubTitle>자산 현황</SubTitle>
        {bankbookData ? (
          bankbookData.map((bankbook) => {
            const balance = bankbook.balance
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return (
              <UL key={bankbook.id}>
                <OL>{type[bankbook.book_type]}</OL>
                <Flex>
                  <Describe>잔액</Describe>
                  <Describe>
                    <Bold>{balance}</Bold>원
                  </Describe>
                </Flex>
                <Flex>
                  <Describe>신규일</Describe>
                  <Describe>{bankbook.created_at}</Describe>
                </Flex>
                <Flex>
                  <Describe>만기일</Describe>
                  <Describe>{bankbook.deadline}</Describe>
                </Flex>

                <Terminate>해지하기</Terminate>
              </UL>
            );
          })
        ) : (
          <p>ddddd</p>
        )}
      </Border>

      <SubTitle>주식 현황</SubTitle>
      <UL>
        <OL>A : </OL>
        <OL>B : </OL>
        <OL>총 : </OL>
      </UL>
      <Button onClick={toDelete}>탈퇴하기</Button>
    </Div>
  );
};

const Div = styled.div`
  width: 500px;
  height: 100%;
  margin: auto;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
`;

const UL = styled.ul`
  width: 300px;
  padding: 0;
  margin: 0;
  margin-bottom: 1rem;
`;

const OL = styled.ol`
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0;
`;

const Title = styled.p`
  font-size: 2.5rem;
  font-weight: bolder;
  text-align: center;
  margin: 10px 0;
  user-select: none;
`;

const Title2 = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
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

const Describe = styled.div`
  font-size: 1.1rem;
`;

const Bold = styled.div`
  display: inline-block;
  font-weight: bold;
  font-size: 1.2rem;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Terminate = styled.button`
  display: block;
  background-color: #e74c3c;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  padding: 5px;

  margin-left: auto;
  margin-right: 0;
  margin-top: 0.5rem;

  cursor: pointer;
`;

const Border = styled.div`
  border: 1px solid #bbbbbb;
  padding: 20px;
  border-radius: 8px;
`;

export default Mypage;
