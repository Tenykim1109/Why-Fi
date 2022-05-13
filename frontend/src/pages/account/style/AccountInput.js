import React from "react";
import styled from "styled-components";

// 상단 여백
const Wrapper = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  width: ${(props) => (props.Width ? props.Width : "400px")}};
  height: 45px;
  border: 1px solid;
  border-radius: 8px;
  font-size: 1rem;
  padding: 0 20px;
  
  ::placeholder {
    text-align: center;
  }

  ::-webkit-inner-spin-button{
    -webkit-appearance: none; 
    margin: 0; 
  }
`;

const AccountInput = ({ ...rest }) => {
  return (
    <Wrapper>
      <Input {...rest} />
    </Wrapper>
  );
};

export default AccountInput;
