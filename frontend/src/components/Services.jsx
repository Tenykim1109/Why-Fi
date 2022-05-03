import React from "react";
import styled from "styled-components";
import { useScrollFadeIn } from "./hooks";
import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";

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
    description: "예금적금하기 여기 멘트수정",
    button: "예금적금",
    link: "/예금",
  },
  {
    title: "모의주식",
    description: "모의주식하기 멘트수정",
    button: "모의주식",
    link: "/모의주식",
  },
  {
    title: "퀴즈",
    description: "퀴즈를통해 학습하기",
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
            <LoginButton>{item.button}</LoginButton>
            {/* </Link> */}
          </S.ItemBox>
        ))}
      </S.ItemWrapper>
    </S.Wrapper>
  );
};

export default Services;
