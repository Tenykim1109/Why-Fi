import React from "react";

export function LoadingError() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
      }}>
      <div
        style={{
          textAlign: "center",
        }}>
        <img
          src="assets/mascot/dolphin_sad_blue.png"
          alt="assets/mascot/dolphin_sad_blue.png"
          style={{
            width: "300px",
            objectFit: "cover",
          }}
        />
      </div>
      <h2
        style={{
          textAlign: "center",
        }}>
        아이템을 준비 중이에요.
      </h2>
      <h3 style={{ textAlign: "center" }}>빠른 시일 내로 준비할게요!</h3>
    </div>
  );
}
