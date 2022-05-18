import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import HelpAtm from "./HelpAtm";

import Banner from "./style/Banner";
import Div from "./style/Div";
import CloseBtn from "../bankbook/style/CloseBtn";

const Atm = () => {
  const [help, setHelp] = useState(true);

  return (
    <div>
      <Banner />
      <Div flex={true}>
        {help ? (
          <>
            <HelpAtm />
            <CloseBtn onClick={() => setHelp((help) => !help)}>닫기</CloseBtn>
          </>
        ) : (
          <>
            <Title>ATM</Title>
            <Position>
              <HelpBtn onClick={() => setHelp((help) => !help)}>도움말</HelpBtn>
            </Position>
            <Outlet />
          </>
        )}
      </Div>
    </div>
  );
};

const Flex = styled.div`
  display: flex;
`;

const Position = styled.div`
  position: absolute;
  top: 150px;
  width: 600px;
`;

const HelpBtn = styled.button`
  width: 70px;
  height: 60px;

  float: right;
  // margin-left: 0;
  // margin-right: auto;
  // margin-bottom: 20px;

  background-color: #4cb5f5;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: 0px;
  border-radius: 8px;
  cursor: pointer;
`;

const Title = styled.p`
  font-size: 3rem;
  font-weight: bolder;
  text-align: center;

  margin: 0;
  // margin: 10px 0;
  margin-bottom: 2rem;
  user-select: none;
`;

export default Atm;
