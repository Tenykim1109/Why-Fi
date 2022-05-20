import React from "react";
import StockNav from "./StockNav";
import HelpStock from "./HelpStock";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setComponent } from "../../modules/slices/stockSlice";

const Help = () => {
  const dispatch = useDispatch();

  return (
    <div>
      {/* <StockNav /> */}
      <DIV>
        <HelpStock />
        <Button
          onClick={() => {
            dispatch(setComponent("default"));
          }}>
          돌아가기
        </Button>
      </DIV>
    </div>
  );
};

const DIV = styled.div`
  width: 600px;
  height: 80vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 180px;
  height: 60px;
  font-weight: bold;
  border: none;
  background-color: #4cb5f5;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  border: 0px;
  border-radius: 8px;
  cursor: pointer;
`;

export default Help;
