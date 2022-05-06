import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;
`

const SubTitle = ({children, ...rest}) => {
  return (
    <Div {...rest}>
      {children}
    </Div>
  );
};

export default SubTitle;