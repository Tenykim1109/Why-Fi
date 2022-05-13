import React from "react";
import styled from "styled-components";

const Component = styled.div`
  // max-width: 40%;
  width: 240px;
`;

const Component2 = ({ children, ...rest }) => {
  return <Component {...rest}>{children}</Component>;
};

export default Component2;
