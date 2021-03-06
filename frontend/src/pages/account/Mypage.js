import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// import Div from "../bankbook/style/Div";
// import Title from "../bankbook/style/Title";
import SubTitle from "../bankbook/style/SubTitle";
import { style } from "@mui/system";

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
    deposit: "??????",
    savings: "??????",
  };

  const stockType = {
    A: "????????????",
    B: "????????????",
    C: "????????????",
  };

  const navigate = useNavigate();

  const toDelete = () => {
    navigate("/mypage/delete");
  };

  // const test = () => {
  //   if (stockData.length === 0) {
  //     console.log("true");
  //   } else {
  //     console.log("false");
  //   }
  // };
  // test();

  return (
    <Div>
      <Flex>
        {/* <Title>{userData && userData.username}?????? ??????</Title> */}
        <Title>{userData && userData.username}</Title>
        <Title2>?????? ??????</Title2>
      </Flex>
      <SubTitle>???????????? : {userData && userData.book_number}</SubTitle>
      <SubTitle>?????? : {userData && totalBalance}???</SubTitle>

      <Border>
        <SubTitle>??? ?????? ??????</SubTitle>
        {bankbookData && bankbookData[0] ? (
          bankbookData.map((bankbook) => {
            const balance = bankbook.balance
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return (
              <UL key={bankbook.id}>
                <Line />
                <OL>{type[bankbook.book_type]}</OL>
                <Flex>
                  <Describe>??????</Describe>
                  <Describe>
                    <Bold>{balance}</Bold>???
                  </Describe>
                </Flex>
                <Flex>
                  <Describe>?????????</Describe>
                  <Describe>{bankbook.created_at}</Describe>
                </Flex>
                <Flex>
                  <Describe>?????????</Describe>
                  <Describe>{bankbook.deadline}</Describe>
                </Flex>

                {/* <Terminate>????????????</Terminate> */}
              </UL>
            );
          })
        ) : (
          <Center>
            <Bold>????????? ?????? ????????? ????????????.</Bold>
          </Center>
        )}
      </Border>

      <Border>
        <SubTitle>??? ?????? ??????</SubTitle>
        {stockData && stockData[0] ? (
          stockData.map((stock) => {
            return (
              <UL key={stock.stock_type}>
                <Line />
                <Flex>
                  <OL>????????? : {stockType[stock.stock_type]}</OL>
                </Flex>
                <Flex>
                  <Describe>?????? ??????</Describe>
                  <OL>
                    {stock.stocks
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </OL>
                </Flex>
                {/* ?????? ????????? ?????? ?????? (+) ?????? */}
                {stock.stock.current_price > stock.purchase_price && (
                  <>
                    <Flex>
                      <Describe>????????????</Describe>
                      <OL>
                        <Surplus>
                          {stock.purchase_price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Surplus>
                      </OL>
                    </Flex>
                    <Flex>
                      <Describe>?????????</Describe>
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
                {/* ?????? ?????? ???????????? ?????? */}
                {stock.stock.current_price === stock.purchase_price && (
                  <>
                    <Flex>
                      <Describe>????????????</Describe>
                      <OL>
                        {stock.purchase_price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </OL>
                    </Flex>
                    <Flex>
                      <Describe>?????????</Describe>
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
                {/* ?????? ????????? ????????? ?????? (-)?????? */}
                {stock.stock.current_price < stock.purchase_price && (
                  <>
                    <Flex>
                      <Describe>????????????</Describe>
                      <OL>
                        <Deficit>
                          {stock.purchase_price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Deficit>
                      </OL>
                    </Flex>
                    <Flex>
                      <Describe>?????????</Describe>
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
          <Center>
            <Bold>????????? ??????????????????.</Bold>
          </Center>
        )}
      </Border>
      <Button onClick={toDelete}>????????????</Button>
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

// ?????? color
const Surplus = styled.ol`
  color: #ff2442;
`;
// ?????? color
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

// ?????? ??????
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
  width: 342px;

  & + & {
    margin: 1rem 0;
  }
`;

const Line = styled.hr`
  width: 99%;
  border: 1px solid #bbbbbb;
  margin: 1rem 0;
`;

const Center = styled.div`
  text-align: center;
`;

export default Mypage;
