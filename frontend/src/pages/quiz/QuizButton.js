import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  & + & {
    margin-left: 1rem;
  }

  background-color: #4CB5F5;
  font-size: 1.5rem;
  width: 150px;
  height: 60px;

  margin-left: ${
    props => props.MarginLeft ? props.MarginLeft : '0px'
  };
  margin-top: ${
    props => props.MarginTop ? props.MarginTop : '0px'
  };

  border: 0px;
  border-radius: 10px;

  text-align: center;
  font-weight: bold;
  color: white;
  padding: 0px;
  cursor: pointer;

  :disabled {
    background-color: gray;
  }
`

const QuizButton = ({children, ...rest}) => {
  return (
    <Button {...rest}>
      {children}
    </Button>
  );
};

export default QuizButton;