import React from 'react';
import styled from 'styled-components';

const P = styled.p`
  font-size: 2.5rem;
  font-weight: bolder;
  text-align: center;
  margin: 10px 0;
  user-select: none;
`

const Title = ({children, ...rest}) => {
  return (
    <P {...rest}>
      {children}
    </P>
  );
};

export default Title;