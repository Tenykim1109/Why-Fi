import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import Input from "./style/Input";
import ConfirmBtn from "./style/ConfirmBtn";
import SetMoney from "./SetMoney";
import Transfer from "./Transfer";

const ImageAnimated = styled("img")({
  width: "300px",
  objectFit: "cover",
  "@keyframes motion": {
    "0%": {
      marginTop: "0px",
    },
    "100%": {
      marginTop: "10px",
    },
  },
  animation: "motion 0.3s linear 0s infinite alternate",
  marginTop: "0px",
});

// 로딩 화면
const Loading = () => {
  return (
    <div
      className="loading"
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        height: "100vh",
      }}>
      <div
        className="loading-item"
        style={{
          textAlign: "center",
        }}>
        <ImageAnimated
          src="assets/mascot/dolphin_default_blue.png"
          alt="asdf.png"
        />
        <h2>계좌 정보를 확인하고 있어요</h2>
      </div>
    </div>
  );
};

const SuccessConfirm = ({ state, accountNum }) => {
  const [step, setStep] = useState("");

  const toTransfer = () => {
    // navigate("/atm/transfer");
    setStep("back");
  };

  const toSetMoney = () => {
    // navigate("/atm/setmoney", { state: state });
    setStep("ahead");
  };

  let ui = "";
  switch (step) {
    case "ahead":
      ui = <SetMoney accountNum={accountNum} />;
      break;
    case "back":
      ui = <Transfer />;
      break;
    default:
      ui = (
        <>
          <h1>받는 사람을 확인해주세요.</h1>
          <Flex>
            <Text>계좌번호 </Text>
            <Input value={state.booknum} readOnly={true} />
          </Flex>
          <Flex>
            <Text>받는 사람</Text>
            <Input value={state.name} readOnly={true} />
          </Flex>
          <FlexConfirm>
            <ConfirmBtn onClick={toTransfer}>취소</ConfirmBtn>
            <ConfirmBtn onClick={toSetMoney}>확인</ConfirmBtn>
          </FlexConfirm>
        </>
      );
  }
  return ui;
};

const FailComfirm = () => {
  const [step, setStep] = useState("");

  const toTransfer = () => {
    // navigate("/atm/transfer");
    setStep("back");
  };

  let ui = "";
  switch (step) {
    case "back":
      ui = <Transfer />;
      break;
    default:
      ui = (
        <>
          <h1>계좌번호를 확인해주세요.</h1>
          <Div>
            <ConfirmBtn onClick={toTransfer}>확인</ConfirmBtn>
          </Div>
        </>
      );
  }

  return ui;
};

const ConfirmResult = ({ state, accountNum }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState("");

  const toTransfer = () => {
    // navigate("/atm/transfer");
    setStep("back");
  };

  const toSetMoney = () => {
    // navigate("/atm/setmoney", { state: state });
    setStep("ahead");
  };

  return (
    <div>
      {state ? (
        <SuccessConfirm state={state} accountNum={accountNum} />
      ) : (
        // 유저 정보가 없을 떄
        <FailComfirm />
      )}
    </div>
  );
};

const NameConfirm = ({ accountNum }) => {
  const { state } = useLocation();
  const [accountState, setAccountState] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const toTransfer = () => {
    navigate("/atm/transfer");
  };

  const toSetMoney = () => {
    navigate("/atm/setmoney", { state: state });
  };

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: `https://k6d108.p.ssafy.io/api/accounts/bookcheck/${accountNum}/`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        const name = res.data[0];
        setAccountState({
          booknum: accountNum,
          name: name,
        });
        // 유저 정보가 존재하면 state로 같이 넘겨줌
        // navigate("/atm/nameconfirm", {
        //   state: { booknum: accountNum, name: name },
        // });

        // item = {
        //   booknum: accountNum,
        //   name: name,
        // };
        // setState("checking");
      })
      .catch((err) => {
        console.log(err.response.data);
        setAccountState(null);
        // 유저 정보가 없으면 그냥 이동
        // navigate("/atm/nameconfirm");
        // item = null;
        // setState("checking");
      });
    setTimeout(() => {
      console.log(accountState);
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ConfirmResult state={accountState} accountNum={accountNum} />
      )}
    </>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  ${({ margin }) => {
    return margin && `margin-bottom: 50px;`;
  }}
`;

const FlexConfirm = styled.div`
  display: flex;
  justify-content: space-between;
  width: 600px;
  margin-top: 1rem;
`;

const Text = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  width: 250px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default NameConfirm;
