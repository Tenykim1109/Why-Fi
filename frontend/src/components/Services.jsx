import React from "react";
import styled from "styled-components";
import { useScrollFadeIn } from "./hooks";
import LoginButton from "./LoginButton";
import { Link, useNavigate } from "react-router-dom";

const S = {
  Wrapper: styled.section`
    width: 100%;
    max-width: 1180px;
    margin: auto;
    padding: 120px 0;
    margin-top: 680px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Label: styled.p`
    display: inline-block;
    ${(props) => props.theme.typography.label};
    color: ${(props) => props.theme.palette.primary};
    margin-bottom: 1rem;
  `,
  Title: styled.h2`
    ${(props) => props.theme.typography.subtitle};
    color: ${(props) => props.theme.palette.black};
    text-align: center;
    margin-bottom: 4rem;
  `,
  ItemWrapper: styled.ul`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  ItemBox: styled.li`
    width: 380px;
    padding: 3rem 2rem;
    text-align: center;
    background-color: ${(props) => props.theme.palette.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 16px 8px rgba(0, 0, 0, 0.03);
    border-radius: 0.5rem;
  `,
  ItemTitle: styled.h3`
    ${(props) => props.theme.typography.heading};
    color: ${(props) => props.theme.palette.black};
    margin-bottom: 1rem;
  `,
  ItemDescription: styled.p`
    ${(props) => props.theme.typography.description};
    margin-bottom: 1.5rem;
  `,
  ItemButton: styled.button`
    ${(props) => props.theme.typography.textbutton};
    color: ${(props) => props.theme.palette.secondary};
    margin-top: auto;
    cursor: pointer;
  `,
};

const SERVICES_ITEMS = [
  {
    title: "예금적금",
    description: "예금 적금 계좌를 만들어 보아요",
    button: "예금적금",
    link: "/예금",
  },
  {
    title: "모의주식",
    description: "주식 투자를 통해 원금을 늘려보아요",
    button: "모의주식",
    link: "/모의주식",
  },
  {
    title: "퀴즈",
    description: "배운 내용을 퀴즈를 통해 확인해 보아요",
    button: "퀴즈",
    link: "/퀴즈",
  },
];

const Services = () => {
  const animatedItem = {
    0: useScrollFadeIn("up", 1, 0),
    1: useScrollFadeIn("up", 1, 0.2),
    2: useScrollFadeIn("up", 1, 0.3),
  };

  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <S.Label>Services</S.Label>
      <S.Title>Why-Fi</S.Title>
      <S.ItemWrapper>
        {SERVICES_ITEMS.map((item, index) => (
          <S.ItemBox key={item.title} {...animatedItem[index]}>
            <S.ItemTitle>{item.title}</S.ItemTitle>
            <br />
            <br />
            <S.ItemDescription>{item.description}</S.ItemDescription>
            <br />

            {/* <Link to={item.link}> */}
            <LoginButton
              onClick={() => {
                navigate("/login");
              }}>
              {item.button}
            </LoginButton>
            {/* </Link> */}
          </S.ItemBox>
        ))}
      </S.ItemWrapper>
    </S.Wrapper>
  );
};

export default Services;
