import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const BORDER = styled.div`
  height: 100%;
  border: 25px solid #4cb5f5;

  @media (max-height: 720px) {
    min-height: 720px;
    // height: 100%;
  }

  @media (min-height: 950px) {
    min-height: 100vh;
    // height: 100%;
  }
`;

// const Border = ({ children }) => {
//   return <BORDER>{children}</BORDER>;
// };

const Border = () => {
  return (
    <BORDER>
      <Outlet />
    </BORDER>
  );
};

export default Border;
