import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import AccountInput from "./style/AccountInput";
import AccountButton from "./style/AccountButton";

import Logo from "../../components/Logo";

const Login = () => {
  const navigate = useNavigate();

  // 아이디, 비밀번호
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 입력 확인 0-pass, 2-success
  const [idCheck, setIdCheck] = useState(0);
  const [pwCheck, setPwCheck] = useState(0);

  const idHandle = (event) => {
    const idInput = event.target.value;
    setId(idInput);
    if (idInput) setIdCheck(2);
    else setIdCheck(0);
  };

  const passwordHandle = (event) => {
    const pwInput = event.target.value;
    setPassword(pwInput);
    if (pwInput) setPwCheck(2);
    else setPwCheck(0);
  };

  const login = () => {
    axios({
      method: "post",
      url: "/accounts/signin/",
      data: {
        username: id,
        password: password,
      },
    })
      .then((res) => {
        // console.log(res.data);
        if (res.data) {
          localStorage.clear();
          localStorage.setItem("refresh-token", res.data.refresh);
          localStorage.setItem("access-token", res.data.access);
          localStorage.setItem("username", id);
        }
        alert("로그인 성공.");
        navigate("/select");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data);
      });
  };

  const toSignup = () => {
    navigate("/signup");
  };

  return (
    <DIV>
      <Logo />
      <form>
        <AccountInput
          type="text"
          name="id_input"
          value={id}
          onChange={idHandle}
          placeholder="아이디"
        />
        <AccountInput
          type="password"
          name="password_input"
          value={password}
          onChange={passwordHandle}
          placeholder="비밀번호"
          autoComplete="on"
        />

        <P onClick={toSignup}>아직 회원이 아니신가요?</P>

        <AccountButton
          MarginTop="1rem"
          type="button"
          onClick={login}
          disabled={!(idCheck && pwCheck)}>
          로그인
        </AccountButton>
      </form>
    </DIV>
  );
};

const DIV = styled.div`
  width: 400px;
  margin: 0 auto;
  margin-bottom: ${(props) => (props.Mb ? props.Mb : "0px")};
  ${({ flex }) => {
    return flex ? `display: flex` : null;
  }}
`;

const P = styled.p`
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 0;
`;

export default Login;
