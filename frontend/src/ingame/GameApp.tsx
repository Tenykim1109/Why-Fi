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

  // 로딩화면 띄우는 용도
  useEffect(() => {
    setLoading(true);

    //게임 연결 - 5초동안 로딩
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <>
      {loading ? <Loading /> : <PhaserGame />}
      <QnAModal />
      <SavingsModal />
      <CashMachineModal />
      <DepositModal />
      <RemittanceModal />
      <StockModal />
    </>
  );
}
