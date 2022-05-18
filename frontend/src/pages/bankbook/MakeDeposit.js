import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import DatePicker from "react-datepicker";
// import { ko } from "date-fns/esm/locale";
import axios from "axios";

// import "react-datepicker/dist/react-datepicker.css";

import Div from "./style/Div";
import HelpDeposit from "./HelpDeposit";
import HelpBtn from "./style/HelpBtn";
import CloseBtn from "./style/CloseBtn";
import Title from "./style/Title";

const MakeDeposit = () => {
  // 가지고 있는 (금액 / 기간)을 초과하지 못하게

  const DateFilterData = [
    // {
    //   id: 1,
    //   value: "초기화",
    // },
    {
      id: 2,
      value: "1주",
    },
    {
      id: 3,
      value: "2주",
    },
    {
      id: 4,
      value: "4주",
    },
    {
      id: 5,
      value: "8주",
    },
    {
      id: 6,
      value: "12주",
    },
    {
      id: 7,
      value: "24주",
    },
  ];

  const MoneyFilterData = [
    {
      id: 0,
      value: "초기화",
    },
    {
      id: 1,
      value: "+ 1천원",
    },
    {
      id: 2,
      value: "+ 5천원",
    },
    {
      id: 3,
      value: "+ 1만원",
    },
    {
      id: 4,
      value: "+ 5만원",
    },
    {
      id: 5,
      value: "+ 10만원",
    },
    // {
    //   id: 6,
    //   value: "+ 20만원",
    // },
    // {
    //   id: 7,
    //   value: "+ 50만원",
    // },
    // {
    //   id: 8,
    //   value: "+ 100만원",
    // },
  ];

  const [btnClicked, setBtnClicked] = useState("1주");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
  );

  const handleBtnClicked = (event) => {
    const { value } = event.target;
    setBtnClicked(value);
    const currentDate = new Date();

    // 오늘
    // if (value === "초기화") {
    //   setStartDate(new Date());
    //   setEndDate(new Date());
    // }
    // 1주일
    if (value === "1주") {
      const week = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      setStartDate(new Date());
      setEndDate(week);
    }
    // 2주일
    if (value === "2주") {
      const weeks = new Date(
        currentDate.getTime() + 2 * 7 * 24 * 60 * 60 * 1000
      );
      setStartDate(new Date());
      setEndDate(weeks);
    }
    // 1개월
    if (value === "4주") {
      const weeks = new Date(
        currentDate.getTime() + 4 * 7 * 24 * 60 * 60 * 1000
      );
      setStartDate(new Date());
      setEndDate(weeks);
    }
    // 2개월
    if (value === "8주") {
      const weeks = new Date(
        currentDate.getTime() + 8 * 7 * 24 * 60 * 60 * 1000
      );
      setStartDate(new Date());
      setEndDate(weeks);
    }
    // 3개월
    if (value === "12주") {
      const weeks = new Date(
        currentDate.getTime() + 12 * 7 * 24 * 60 * 60 * 1000
      );
      setStartDate(new Date());
      setEndDate(weeks);
    }
    // 6개월
    if (value === "24주") {
      const weeks = new Date(
        currentDate.getTime() + 24 * 7 * 24 * 60 * 60 * 1000
      );
      setStartDate(new Date());
      setEndDate(weeks);
    }
  };

  const [money, setMoney] = useState(0);
  const [moneyWithComma, setMoneyWithComma] = useState();

  // const moneyInputHandle = (event) => {
  //   setMoney(Number(event.target.value));
  // };

  const moneyBtnHandle = (event) => {
    const { value } = event.target;
    setMoney(event.target.value);
    console.log(money);
    if (value === "초기화") {
      setMoney(0);
    }
    if (value === "+ 1천원") {
      setMoney(money + 1000);
    }
    if (value === "+ 5천원") {
      setMoney(money + 5000);
    }
    if (value === "+ 1만원") {
      setMoney(money + 10000);
    }
    if (value === "+ 5만원") {
      setMoney(money + 50000);
    }
    if (value === "+ 10만원") {
      setMoney(money + 100000);
    }
    // if (value === "+ 20만원") {
    //   setMoney(money + 200000);
    // }
    // if (value === "+ 50만원") {
    //   setMoney(money + 500000);
    // }
    // if (value === "+ 100만원") {
    //   setMoney((money) => (money + 1000000));
    // }
  };

  const [help, setHelp] = useState(true);

  const navigate = useNavigate();
  // console.log(btnClicked.slice(0, -1))
  const make = () => {
    if (!money) alert("맡길 금액을 설정해주세요.");
    else
      axios({
        url: "https://k6d108.p.ssafy.io/api/bankbooks/create/",
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        data: {
          payment: money,
          deadline: endDate.toISOString().slice(0, 10),
          book_type: "deposit",
        },
      })
        .then((res) => {
          console.log(res.data);
          navigate("/deposit/success", { state: "예금" });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
  };

  // 예상 금액 조회
  const [expectedMoney, setExpectedMoney] = useState(0);

  useEffect(() => {
    const getExpectedMoney = async () => {
      await axios({
        url: "https://k6d108.p.ssafy.io/api/bankbooks/getinterest/",
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        data: {
          payment: money,
          deadline: endDate.toISOString().slice(0, 10),
          book_type: "deposit",
        },
      }).then((res) => {
        // console.log(res.data);
        setExpectedMoney(
          res.data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
      });
    };
    if (money) {
      getExpectedMoney();
    } else {
      setExpectedMoney(0);
    }
  }, [endDate, money]);

  // money 자릿수 표기
  useEffect(() => {
    setMoneyWithComma(money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }, [money]);

  return (
    <Div flex={true}>
      {help ? (
        <>
          <HelpDeposit />
          <CloseBtn onClick={() => setHelp((help) => !help)}>
            그만 보기
          </CloseBtn>
        </>
      ) : (
        <>
          <Title>예금 가입</Title>
          <HelpBtn onClick={() => setHelp((help) => !help)}>도움말</HelpBtn>
          <Flex>
            <Text>시작일자</Text>
            <Input
              type="date"
              value={startDate.toISOString().substring(0, 10)}
              readOnly={true}
            />
          </Flex>
          <Flex>
            <Text>만기일자</Text>
            <Input
              type="date"
              value={endDate.toISOString().substring(0, 10)}
              readOnly={true}
            />
          </Flex>
          <Flex>
            <Text>가입기간</Text>
            <Box>{btnClicked}</Box>
          </Flex>
          <div>
            {DateFilterData.map((filter, idx) => (
              <InputBtn
                onClick={handleBtnClicked}
                key={idx}
                type="button"
                value={filter.value}
              />
            ))}
          </div>
          <Flex>
            <Text>맡길 금액</Text>
            {/* <Input
              type="number"
              // onChange={moneyInputHandle}
              readOnly={true}
              // value={money + "원"}
              value={moneyWithComma}
            /> */}
            <Box>{moneyWithComma}원</Box>
          </Flex>
          <div>
            {MoneyFilterData.map((filter, idx) => (
              <InputBtn
                onClick={moneyBtnHandle}
                key={idx}
                type="button"
                value={filter.value}
              />
            ))}
          </div>
          <Flex>
            <Text>이자율</Text>
            <Box> 5%</Box>
          </Flex>
          <Flex>
            <Text>예상 금액 (이자 계산)</Text>
            <Box>{expectedMoney}원</Box>
          </Flex>
          <ErrorMsg>
            정해진 시간 (저녁 12시)에 잔액이 부족하여 <br />
            금액이 납부되지 않으면 자동으로 해지될 수 있어요.
          </ErrorMsg>
          <Button onClick={make}>가입하기</Button>
        </>
      )}
    </Div>
  );
};

const Text = styled.p`
  font-size: 1.1rem;
  width: 250px;
`;

// const DatePickerStyled = styled.div`
//   .react-datepicker-wrapper {
//     width: 100%;
//   }
// `;

// const SelectDate = styled(DatePicker)`
//   width: 250px;
//   height: 40px;
//   padding: 6px 12px;
//   font-size: 1.2rem;
//   text-align: center;
//   border: 1px solid #e5e5e5;
//   border-radius: 10px;
//   outline: none;
//   cursor: pointer;
//   .react-datepicker__input-container {
//     width: inherit;
//   }
//   .react-datepicker-wrapper {
//     width: 100%;
//   }
// `;

const Input = styled.input`
  width: 250px;
  height: 40px;
  padding: 6px 12px;
  font-size: 1.2rem;
  text-align: center;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  outline: none;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-calendar-picker-indicator {
    display: none;
    margin: 0;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  ${({ margin }) => {
    return margin && `margin-bottom: 50px;`;
  }}
`;

const InputBtn = styled.input`
  & + & {
    margin-left: 4px;
  }
  height: 40px;
  width: 80px;
  font-size: 1rem;
  background-color: #d5d5d5;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  cursor: pointer;
`;

const Button = styled.button`
  // margin-top: 30px;
  margin-left: auto;
  margin-right: 0;
  font-size: 1rem;
  width: 200px;
  height: 50px;
  background-color: #4cb5f5;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: 0px;
  border-radius: 8px;
  cursor: pointer;
`;

const Box = styled.div`
  width: 250px;
  height: 40px;
  padding: 6px 12px;
  font-size: 1.2rem;
  text-align: center;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  outline: none;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ErrorMsg = styled.p`
  color: red;
  text-align: center;
`;

export default MakeDeposit;
