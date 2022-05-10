import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Result = () => {
  const { state } = useLocation();
  console.log(state);
  const navigate = useNavigate();
  const toPassword = () => {
    navigate("/atm/password", { state: state });
  };
  return (
    <div>
      {state ? (
        <>
          <h1>비밀번호를 다시 입력해주세요.</h1>
          <button onClick={toPassword}>확인</button>
        </>
      ) : (
        <>
          <h1>송금을 완료했어요.</h1>
          <button>확인</button>
        </>
      )}
    </div>
  );
};

export default Result;
