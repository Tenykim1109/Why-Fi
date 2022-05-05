import React from 'react';
import styled from 'styled-components';

const DIV = styled.div`
  width: 500px;
  height: 100%;
  margin: auto;
  ${({ flex }) => {
    return flex ? 
      `display: flex; flex-direction: column; justify-content: center; align-items: center;` 
      : null;
  }}
`

const Div = ({children, ...rest}) => {
  return (
    <DIV {...rest}>
      {children}
    </DIV>
  );
};

export default Div;