import React from "react";
import styled from "styled-components";
import { topimage } from "../assets";
import LoginButton from "./LoginButton";
import { Link, useNavigate } from "react-router-dom";

const S = {
  Background: styled.section`
    position: absolute;
    top: 81px;
    width: 100%;
    height: 700px;
    background: no-repeat center/cover url(${topimage});
  `,
  Wrapper: styled.div`
    width: 100%;
    height: 100%;
    max-width: 1180px;
    padding-top: 100px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
  `,
  Title: styled.h1`
    ${(props) => props.theme.typography.title};
    color: #fff;
    margin-bottom: 0.5rem;
  `,
  Description: styled.p`
    ${(props) => props.theme.typography.description};
    color: ${(props) => props.theme.palette.white};
    margin-bottom: 2rem;
  `,
};
const TopBanner = () => {
  const navigate = useNavigate();
  return (
    <S.Background>
      <S.Wrapper>
        <S.Title>Why-Fi</S.Title>
        <S.Description>
          Why-Fi 는 어린이들을 위한 금융교육 플랫폼입니다
        </S.Description>

        <LoginButton
          fill="solid"
          type="button"
          onClick={() => {
            // 테스트용 ingame 이동
            console.log("이동");
            navigate("/ingame");
          }}>
          시작하기
        </LoginButton>
      </S.Wrapper>
    </S.Background>
  );
};

export default TopBanner;
