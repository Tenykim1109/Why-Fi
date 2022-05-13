import React from "react";
import styled from "styled-components";

const Component = styled.div`
  // max-width: 60%;
  width: 360px;
  // padding: 10px;
  padding-right: 10px;
`;

const Component1 = ({ children, ...rest }) => {
  return <Component {...rest}>{children}</Component>;
};

export default Component1;
