import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Div from '../bankbook/Div';

const Delete = () => {

  const navigate = useNavigate()

  const toHome = () => {
    navigate('/')
  }
  const toMypage = () => {
    navigate('/mypage')
  }

  return (
    <Div flex={true}>
      <Content>
        정말로 탈퇴하시겠어요?
      </Content>
      <Flex>
        <Yes onClick={toHome}>예</Yes>
        <No onClick={toMypage}>아니요</No>
      </Flex>
    </Div>
  );
};

const Flex = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Content = styled.p`
  font-size: 2rem;
  font-weight: bold;
`

const No = styled.button`
  width: 180px;
  height: 60px;

  background-color: #4CB5F5;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  border: 0px;
  border-radius: 8px;
  margin: 0 30px;
  cursor: pointer;
  `
  
  const Yes = styled.button`
  width: 180px;
  height: 60px;
  
  background-color: #e74c3c;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  border: 0px;
  border-radius: 8px;
  margin: 0 30px;
  cursor: pointer;
`

export default Delete;