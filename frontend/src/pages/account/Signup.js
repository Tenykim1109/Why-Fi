import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'
import styled from 'styled-components';
import AccountInput from './AccountInput';
import AccountButton from './AccountButton';

import Logo from '../../components/Logo';

const Signup = () => {
  // const navigate = useNavigate()

  // 이름, 아이디, 생년월일, 비밀번호, 비밀번호 확인
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [birth, setBirth] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  // 유효성 검사 0-pass, 1-error, 2-success
  const [idError, setIdError] = useState(0)
  const [idDuplicate, setIdDuplicate] = useState(0)
  const [pwError, setPwError] = useState(0)
  const [pwConfirmError, setPwConfirmError] = useState(0)

  // 에러메시지
  const [idMsg, setIdMsg] = useState('')
  const [pwMsg, setPwMsg] = useState('')
  const [pwConfirmMsg, setPwConfirmMsg] = useState('')

  // 아이디 4~16자 영문+숫자
  const idHandle = (event) => {
    const idInput = event.target.value
    setId(idInput)

    //아이디 유효성 검사
    var idValid = /^[a-zA-Z0-9]*$/; 
    if (!idValid.test(idInput)) {
      setIdMsg('아이디는 영어와 숫자만 입력해주세요.')
      setIdError(1)
    }
    else if (idInput.length < 4 || idInput.length > 16) {
      setIdMsg('아이디는 4자 이상 16자 이하로 설정해주세요.')
      setIdError(1)
    }
    else {
      setIdMsg('')
      setIdError(2)
    }
  
  }
  const nameHandle = (event) => {
    setName(event.target.value)
  }

  // 생년월일 숫자 6자리
  const birthHandle = (event) => {
    const birthInput = event.target.value
    // 생년월일 자리수 제한
    if (birthInput.length > 6) {
      const validBirth = birthInput.substr(0, 6)
      setBirth(validBirth)
    }
    else {
      setBirth(birthInput)
    }
  }

  // 비밀번호 8~20자 영문+숫자(+특문)
  const passwordHandle = (event) => {
    const pwInput = event.target.value
    setPassword(pwInput)
    // console.log(pwInput)

    // 비밀번호 유효성 검사
    var pwValid = /^[a-zA-Z0-9]*$/;
    if (!pwValid.test(pwInput)) {
      setPwMsg('비밀번호는 영어와 숫자만 입력해주세요.')
      setPwError(1)
    }
    else if (pwInput.length < 8 || pwInput.length > 20) {
      setPwMsg('비밀번호는 8자 이상 20자 이하로 설정해주세요.')
      setPwError(1)
    }
    else {
      setPwMsg('')
      setPwError(2)
    }
  }

  // 비밀번호 확인 = 비밀번호
  const passwordConfirmHandle = (event) => {
    const pwConfirmInput = event.target.value
    setPasswordConfirm(pwConfirmInput)

    // 비밀번호 확인 유효성 검사
    if (pwConfirmInput !== password) {
      setPwConfirmMsg('비밀번호가 일치하지 않아요.')
      setPwConfirmError(1)
    }
    else {
      setPwConfirmMsg('')
      setPwConfirmError(2)
    }
  }

  const duplicateCheck = () => {
    console.log('중복검사')
    setIdDuplicate(2)
    // axios({
    //   method: 'post',
    //   // 주소 변경해야
    //   url: 'http://localhost:8080/idcheck',
    //   data: {
    //     name: id,
    //   },
    // })
    // .then((res) => {
    //   console.log(res.data)
    //   alert('사용할 수 있는 아이디에요.')
    //   setIdDuplicate(2)    
    // })
    // .catch((err) => {
    //   console.log(err)
    //   alert('이미 가입된 아이디에요.')
    //   setIdDuplicate(1)
    // })
  }
  // navigate('/');
  
  const signup = () => {
    console.log('회원가입')
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:8080/signup',
    //   data: {
    //     name: id,
    //     birthday: birth,
    //     username: name,
    //     password: password,
    //     password_confirm: passwordConfirm,
    //   },
    // })
    // .then((res) => {
    //   console.log(res.data)
    //   alert('회원가입 성공.')
    //   navigate('/');
    // })
    // .catch((err) => {
    //   console.log(err)
    //   alert('회원가입 실패.')
    // })
  }

  return (
    <DIV>
      {/* 로고 & 프로젝트 이름 */}
      <Logo />
      {/* 회원가입 폼 */}
      <form>
        <DIV flex={true} Mb='1rem'>
          <AccountInput Width='290px' type='text' name='id_input' value={id} onChange={idHandle} placeholder='아이디' />
          <AccountButton Width='95px' MarginLeft='1rem'
            disabled={idError !== 2}
            type='button'
            onClick={duplicateCheck}
          >중복확인</AccountButton>
        </DIV>
        {idMsg && <ErrorMsg>{idMsg}</ErrorMsg>}
        <AccountInput type='text' name='name_input' value={name} onChange={nameHandle} placeholder='이름' />
        <AccountInput type='number' name='birth_input' maxlength='6' value={birth} onChange={birthHandle} placeholder='생년월일 6자리' />
        <AccountInput type='password' name='password_input' value={password} onChange={passwordHandle} placeholder='비밀번호' autoComplete="on" />
        {pwMsg && <ErrorMsg>{pwMsg}</ErrorMsg>}
        <AccountInput type='password' name='passwordConfirm_input' value={passwordConfirm} onChange={passwordConfirmHandle} placeholder='비밀번호확인' autoComplete="on" />
        {pwConfirmMsg && <ErrorMsg>{pwConfirmMsg}</ErrorMsg>}

        <AccountButton MarginTop='1rem' 
          // disabled={!(idError === 2 && pwError === 2 && pwConfirmError === 2)}
          disabled={!(idError === 2 && pwError === 2 && pwConfirmError === 2 && idDuplicate === 2)}
          type='button'
          onClick={signup}
        >가입하기</AccountButton>
      </form>
    </DIV>
  );
};

const DIV = styled.div`
  margin: auto;
  margin-bottom: ${
    props => props.Mb ? props.Mb : '0px'
  };
  width: 400px;
  ${({ flex }) => {
    return flex ? `display: flex` : null;
  }}
`

const ErrorMsg = styled.p`
  color: red;
  text-align: center;
`

export default Signup;