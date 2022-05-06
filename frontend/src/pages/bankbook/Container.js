import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  box-sizing: border-box;
  width: 500px;
  border: 1px solid #4CB5F5;
  border-radius: 5px;
  padding: 10px;
  user-select: none;
`

const Container = ({children, ...rest}) => {
  return (
    <Div {...rest}>
      {children}
    </Div>
  );
};

export default Container;