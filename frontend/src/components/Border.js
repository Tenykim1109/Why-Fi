import React from "react";
import styled from "styled-components";

const BORDER = styled.div`
  min-height: 720px;
  height: 100vh;
  border: 25px solid #4cb5f5;
`;

const Border = ({ children }) => {
  return <BORDER>{children}</BORDER>;
};

export default Border;
