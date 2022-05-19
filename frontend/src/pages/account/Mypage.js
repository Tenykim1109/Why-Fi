import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// import Div from "../bankbook/style/Div";
// import Title from "../bankbook/style/Title";
import SubTitle from "../bankbook/style/SubTitle";

const Mypage = () => {
  const [userData, setUserData] = useState();
  const [totalBalance, setTotalBalance] = useState(0);

  const getUserData = () => {
    axios({
      url: `https://k6d108.p.ssafy.io/api/accounts/self/`,
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
  // console.log(bankbookData);

  const getBankbookData = async () => {
    await axios({
      url: `https://k6d108.p.ssafy.io/api/bankbooks/booklist/`,
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

  const [stockData, setStockData] = useState();
  // console.log(stockData);

  const getStockData = async () => {
    await axios({
      url: `https://k6d108.p.ssafy.io/api/bankbooks/mystocklist/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        console.log("stock data", res.data);
        setStockData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserData();
    getBankbookData();
    getStockData();
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
        <SubTitle>내 자산 현황</SubTitle>
        {bankbookData ? (
          bankbookData.map((bankbook) => {
            const balance = bankbook.balance
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return (
              <UL key={bankbook.id}>
                <Line />
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

                {/* <Terminate>해지하기</Terminate> */}
              </UL>
            );
          })
        ) : (
          <Bold>예금/적금을 가입해보세요.</Bold>
        )}
      </Border>

      <Border>
        <SubTitle>내 주식 현황</SubTitle>
        {stockData ? (
          stockData.map((stock) => {
            return (
              <UL key={stock.stock_type}>
                <Line />
                <Flex>
                  <OL>종목명 : {stock.stock_type}</OL>
                </Flex>
                <Flex>
                  <Describe>보유 수량</Describe>
                  <OL>
                    {stock.stocks
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </OL>
                </Flex>
                {/* 주식 가격이 오른 경우 (+) 상황 */}
                {stock.stock.current_price > stock.purchase_price && (
                  <>
                    <Flex>
                      <Describe>평균가격</Describe>
                      <OL>
                        <Surplus>
                          {stock.purchase_price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Surplus>
                      </OL>
                    </Flex>
                    <Flex>
                      <Describe>수익률</Describe>
                      <OL>
                        <Surplus>
                          {(
                            ((stock.stock.current_price -
                              stock.purchase_price) /
                              stock.purchase_price) *
                            100
                          ).toFixed(2) + "%"}
                        </Surplus>
                      </OL>
                    </Flex>
                  </>
                )}
                {/* 주식 가격 그대로인 경우 */}
                {stock.stock.current_price === stock.purchase_price && (
                  <>
                    <Flex>
                      <Describe>평균가격</Describe>
                      <OL>
                        {stock.purchase_price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </OL>
                    </Flex>
                    <Flex>
                      <Describe>수익률</Describe>
                      <OL>
                        {(
                          ((stock.stock.current_price - stock.purchase_price) /
                            stock.purchase_price) *
                          100
                        ).toFixed(2) + "%"}
                      </OL>
                    </Flex>
                  </>
                )}
                {/* 주식 가격이 내려간 경우 (-)상황 */}
                {stock.stock.current_price < stock.purchase_price && (
                  <>
                    <Flex>
                      <Describe>평균가격</Describe>
                      <OL>
                        <Deficit>
                          {stock.purchase_price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Deficit>
                      </OL>
                    </Flex>
                    <Flex>
                      <Describe>수익률</Describe>
                      <OL>
                        <Deficit>
                          {(
                            ((stock.stock.current_price -
                              stock.purchase_price) /
                              stock.purchase_price) *
                            100
                          ).toFixed(2) + "%"}
                        </Deficit>
                      </OL>
                    </Flex>
                  </>
                )}
              </UL>
            );
          })
        ) : (
          <Bold>보유하고 있는 주식이 없어요.</Bold>
        )}
      </Border>
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

// 흑자 color
const Surplus = styled.ol`
  color: #ff2442;
`;
// 적자 color
const Deficit = styled.ol`
  color: #3db2ff;
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
  margin-bottom: 2rem;
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

// 해지 버튼
// const Terminate = styled.button`
//   display: block;
//   background-color: #e74c3c;
//   color: white;
//   font-weight: bold;
//   font-size: 1.1rem;
//   border: none;
//   border-radius: 5px;
//   padding: 5px;

//   margin-left: auto;
//   margin-right: 0;
//   margin-top: 0.5rem;

//   cursor: pointer;
// `;

const Border = styled.div`
  border: 1px solid #bbbbbb;
  padding: 20px;
  border-radius: 8px;

  & + & {
    margin: 1rem 0;
  }
`;

const Line = styled.hr`
  width: 99%;
  border: 1px solid #bbbbbb;
  margin: 1rem 0;
`;

export default Mypage;
