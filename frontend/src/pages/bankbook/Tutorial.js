import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Whale from "../../components/whale.png";
// import WhaleSmile from "../../components/whale_smile.jpg";

import HelpBankbook from "./HelpBackbook";
import Div from "./style/Div";
import CloseBtn from "./style/CloseBtn";
import HelpBtn from "./style/HelpBtn";
import Container from "./style/Container";
import Title from "./style/Title";
import Describe from "./style/Describe";
import Bold from "./style/Bold";

const Tutorial = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [pageMain, setPageMain] = useState(0);

  const [help, setHelp] = useState(true);
  const [close, setClose] = useState(false);
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [pw, setPw] = useState("");

  const [nameError, setNameError] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [birthError, setBirthError] = useState(0);
  const [pwError, setPwError] = useState(0);
  // const [pwErrorMsg, setPwErrorMsg] = useState("");

  const nameHandle = (event) => {
    const inputName = event.target.value;
    setName(inputName);

    // 이름 유효성 검사
    var nameValid = /^[가-힣]{2,15}$/;
    if (!nameValid.test(inputName)) {
      setErrorMsg("한글만 입력해주세요.");
      setNameError(1);
    } else {
      setErrorMsg("");
      setNameError(2);
    }
  };
  const birthHandle = (event) => {
    const inputBirth = event.target.value;
    if (inputBirth.length >= 8) {
      const validBirth = inputBirth.substr(0, 8);
      setBirth(validBirth);
      setBirthError(2);
    } else {
      setBirth(inputBirth);
      setBirthError(1);
    }
  };

  const pwHandle = (event) => {
    const inputPW = event.target.value;

    if (isFinite(inputPW)) {
      console.log("ok");
      setPw(inputPW);

      if (inputPW.length >= 4) {
        const validPw = inputPW.substr(0, 4);
        setPw(validPw);
        setPwError(2);
      } else {
        setPw(inputPW);
        setPwError(1);
      }
    } else {
      setPwError(1);
    }
  };

  const closeHandle = () => {
    setHelp((help) => !help);
    setPage(1);
  };

  // const next = () => {
  //   setPageMain(1);
  // };
  const prev = () => {
    setPageMain(0);
  };

  const authentication = (event) => {
    event.preventDefault();
    const year = birth.substr(0, 4);
    const month = birth.substr(4, 2);
    const date = birth.substr(6, 2);
    const birthChange = year + "-" + month + "-" + date;
    axios({
      url: "http://127.0.0.1:8000/api/accounts/selfcheck/",
      method: "POST",
      data: {
        name: name,
        birthday: birthChange,
        // book_password: pw,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        console.log(res);
        setPageMain(1);
      })
      .catch((err) => {
        console.log(err.response.data);
        alert("이름과 생년월일을 확인해주세요.");
      });
  };

  const makeBankBook = (event) => {
    event.preventDefault();
    const year = birth.substr(0, 4);
    const month = birth.substr(4, 2);
    const date = birth.substr(6, 2);
    const birthChange = year + "-" + month + "-" + date;
    console.log(birthChange);
    axios({
      url: "http://127.0.0.1:8000/api/accounts/setpassword/",
      method: "PUT",
      data: {
        // name: name,
        // birthday: birthChange,
        book_password: pw,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        navigate("/savings/success", { state: "통장" });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <Div flex={true}>
      {help ? (
        <>
          <HelpBankbook page={page} setPage={setPage} setClose={setClose} />
          {close && <CloseBtn onClick={closeHandle}>닫기</CloseBtn>}
        </>
      ) : (
        <>
          <Title>통장 가입</Title>
          <HelpBtn onClick={() => setHelp((help) => !help)}>도움말</HelpBtn>
          {!pageMain ? (
            <form>
              <Flex>
                <Text>이름</Text>
                <Input
                  type="text"
                  value={name}
                  onChange={nameHandle}
                  placeholder="이름"
                />
              </Flex>
              <ErrorMsg>{errorMsg}</ErrorMsg>
              <Flex>
                <Text>생년월일</Text>
                <Input
                  type="number"
                  maxlength="6"
                  value={birth}
                  onChange={birthHandle}
                  placeholder="생년월일 8자리"
                />
              </Flex>
              <NextBtn
                disabled={!(nameError === 2 && birthError === 2)}
                onClick={authentication}>
                다음
              </NextBtn>
            </form>
          ) : (
            <form>
              <Flex>
                <Text>비밀번호</Text>
                <Input
                  type="password"
                  maxlength="4"
                  value={pw}
                  onChange={pwHandle}
                  placeholder="비밀번호 숫자 4자리"
                  autoComplete="on"
                />
              </Flex>
              <Flex>
                <PrevBtn onClick={prev}>이전</PrevBtn>
                <MakeBtn
                  onClick={makeBankBook}
                  disabled={
                    !(nameError === 2 && pwError === 2 && birthError === 2)
                  }>
                  가입하기
                </MakeBtn>
              </Flex>
            </form>
          )}
          <IMG src={Whale} alt="whale" />
          <Container>
            <Describe>
              {!pageMain ? (
                <>
                  실제로는 <Bold>신분증</Bold>과 <Bold>주민등록등본</Bold>과
                  같은 서류들과 <br /> <Bold>추가적인 정보</Bold>들이 더
                  필요해요.
                </>
              ) : (
                <>
                  비밀번호 네 자리로 <Bold>연속된 숫자</Bold>나
                  <Bold>쉬운 숫자</Bold>는
                  <br />
                  피해야 해요.
                </>
              )}
            </Describe>
          </Container>
        </>
      )}
    </Div>
  );
};

const Flex = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  font-size: 1.1rem;
  width: 250px;
`;

const Input = styled.input`
  width: 250px;
  height: 40px;
  padding: 6px 12px;
  font-size: 1.2rem;
  text-align: center;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  outline: none;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ErrorMsg = styled.p`
  color: red;
  text-align: center;
  margin: 0;
`;

const IMG = styled.img`
  width: 300px;
  height: 300px;
  margin: 0 auto;
`;

const PrevBtn = styled.button`
  display: block;
  font-size: 1.1rem;
  font-weight: bold;
  width: 75px;
  height: 50px;
  background-color: #4cb5f5;
  color: white;
  border: 0px;
  border-radius: 8px;
  margin-left: 0;
  margin-right: auto;
  cursor: pointer;

  :disabled {
    background-color: gray;
    cursor: default;
  }
`;

const NextBtn = styled.button`
  display: block;
  font-size: 1.1rem;
  font-weight: bold;
  width: 75px;
  height: 50px;
  background-color: #4cb5f5;
  color: white;
  border: 0px;
  border-radius: 8px;
  margin-left: auto;
  margin-right: 0;
  cursor: pointer;

  :disabled {
    background-color: gray;
    cursor: default;
  }
`;

const MakeBtn = styled.button`
  width: 100px;
  height: 50px;

  font-size: 1.1rem;
  font-weight: bold;
  background-color: #4cb5f5;
  color: white;
  border: 0px;
  border-radius: 8px;
  cursor: pointer;

  :disabled {
    background-color: gray;
    cursor: default;
  }
`;

export default Tutorial;
