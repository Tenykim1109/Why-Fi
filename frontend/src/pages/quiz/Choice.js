import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  border: 0.4rem solid;
  border-radius: 100%;
  font-size: 2rem;
  font-weight: bolder;
  background-color: transparent;
  color: #0C4274;
  cursor: pointer;

  & + & {
    margin-left: 2rem;
  }
`

const Choice = ({children, ...rest}) => {
  return (
    <Btn {...rest}>
      {children}
    </Btn>
  );
};

export default Choice;