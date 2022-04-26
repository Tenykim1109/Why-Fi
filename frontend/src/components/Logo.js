import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from './why-fi_logo.png'

const Logo = () => {
  
  const navigate = useNavigate()

  const toHome = () => {
    navigate('/')
  }

  return (
    <DIV onClick={toHome}>
      <IMG src={LogoImg} alt='logo' />
      <P>Why-Fi</P>
    </DIV>
  );
};

const IMG = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
`

const P = styled.p`
  margin: 0;
  font-size: 52px;
  font-weight: bold;
`

const DIV = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3.5rem 0;
  user-select: none;
  cursor: pointer;
`

export default Logo;