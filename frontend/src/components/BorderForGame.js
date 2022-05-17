import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const BORDER = styled.div`
  min-height: 720px;
  height: 100vh;
  border: 25px solid #4cb5f5;
`;

const BorderForGame = ({ children }) => {
  return (
    <BORDER>
      <Outlet />
    </BORDER>
  );
};

export default BorderForGame;
