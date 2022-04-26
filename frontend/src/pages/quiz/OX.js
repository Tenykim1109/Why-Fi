import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  border: none;
  font-size: 6rem;
  font-weight: bolder;
  background-color: transparent;
  color: ${
    props => props.Color && props.Color
  }};  
  cursor: pointer;

  & + & {
    margin-left: 2rem;
  }

  user-select: none:
`

const OX = ({children, ...rest}) => {
  return (
    <Btn {...rest}>
      {children}
    </Btn>
  );
};

export default OX;