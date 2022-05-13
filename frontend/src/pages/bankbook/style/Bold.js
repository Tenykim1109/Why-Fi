import React from "react";
import styled from "styled-components";

const Div = styled.div`
  display: inline;
  font-weight: bold;
`;

const Bold = ({ children, ...rest }) => {
  return <Div {...rest}>{children}</Div>;
};

export default Bold;
