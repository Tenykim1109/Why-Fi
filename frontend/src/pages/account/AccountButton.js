import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #4CB5F5;
  font-size: 1rem;
  width: ${
    props => props.Width ? props.Width : '400px'
  }};
  height: 45px;

  margin-left: ${
    props => props.MarginLeft ? props.MarginLeft : '0px'
  };
  margin-top: ${
    props => props.MarginTop ? props.MarginTop : '0px'
  };

  border: 0px;
  border-radius: 8px;

  text-align: center;
  font-weight: bold;
  color: white;
  padding: 0px;
  cursor: pointer;

  :disabled {
    background-color: gray;
  }
`

const AccountButton = ({children, ...rest}) => {
  return (
    <Button {...rest}>{children}</Button>
  );
};

export default AccountButton;