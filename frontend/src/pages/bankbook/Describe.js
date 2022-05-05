import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  margin: 10px 0;
  white-space: pre-line;
`

const Describe = ({children, ...rest}) => {
  return (
    <Div {...rest}>
      {children}
    </Div>
  );
};

export default Describe;