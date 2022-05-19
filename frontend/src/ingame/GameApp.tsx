import React, { useEffect, useState } from "react";
import { styled } from "@mui/material";
import PhaserGame from "./PhaserGame";
import { LoadingText, ToolTip } from "./constants/loadingText";
import QnAModal from "./modal/QnAModal";
import SavingsModal from "./modal/SavingsModal";
import CashMachineModal from "./modal/CashMachineModal";
import DepositModal from "./modal/DepositModal";
import RemittanceModal from "./modal/RemittanceModal";
import StockModal from "./modal/StockModal";
import UserModal from "./modal/UserModal";
import QuizModal from "./modal/QuizModal";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setUserId,
  setBookNumber,
  setBookPwd,
  notHavePwd,
  havePwd,
  setBalance,
} from "../modules/slices/userSlice";
import TutorialModal from "./modal/TutorialModal";

interface PwdResponse {
  data: Array<string>;
}

interface UserResponse {
  data: {
    balance: number;
    book_number: string;
    username: string;
  };
}

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
  const load_idx = Math.floor(Math.random() * LoadingText.length); // 배열에서 랜덤하게 값 출력
  const tooltip_idx = Math.floor(Math.random() * ToolTip.length);

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
        <h2>{LoadingText[load_idx]}</h2>
        <h3>{`TIP: ${ToolTip[tooltip_idx]}`}</h3>
      </div>
    </div>
  );
};

export default function GameApp() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getUserInfo = async () => {
    try {
      const res: UserResponse = await axios({
        method: "get",
        url: "https://k6d108.p.ssafy.io/api/accounts/self/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });

      console.log(res);
      dispatch(setBookNumber(res.data.book_number));
      dispatch(setUserId(res.data.username));
      dispatch(setBalance(res.data.balance));
      console.log("get userinfo!");
    } catch (err) {
      console.log(err);
      console.log("error get userinfo");
    }
  };

  const getTutorialInfo = async () => {
    console.log("asdf");
    try {
      const res: PwdResponse = await axios({
        method: "get",
        url: "https://k6d108.p.ssafy.io/api/accounts/tutorialcheck/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });

      console.log(res);
      const pwd = res.data[0];

      if (pwd === "") {
        dispatch(notHavePwd());
      } else {
        dispatch(havePwd());
      }
      dispatch(setBookPwd(pwd));
      console.log("success!");
    } catch (err) {
      console.log(err);
      console.log("error!");
    }
  };

  // 로딩화면 띄우는 용도
  useEffect(() => {
    setLoading(true);

    //게임 연결 - 5초동안 로딩
    setTimeout(() => {
      getUserInfo();
    }, 1500);
    setTimeout(() => {
      getTutorialInfo();
    }, 3000);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  // const LoadedItem = () => {
  //   switch (loading) {
  //     cas
  //   }
  // };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <PhaserGame />
          <TutorialModal />
        </>
      )}
      <QnAModal />
      <SavingsModal />
      <CashMachineModal />
      <DepositModal />
      <RemittanceModal />
      <StockModal />
      <UserModal />
      <QuizModal />
    </>
  );
}
